const { default: axios } = require("axios");
const dataModel = require("../Model/data.model");

let globalPage = 1;
let globalLimit = 10;
function GetDataMore50Less100() {
    let input = 50;
    let output = Math.floor(Math.random(input) * 100);
    if (output < 50) {
        output = output + 50;
    }
    return output;
}

const GetData = async (filter) => {
    try {
        globalPage = filter.page;
        globalLimit = filter.limit;
        if (!filter.page) {
            globalPage = 1;
        }
        if (!filter.limit) {
            globalLimit = 10;
        }
        let data = await dataModel
            .find({})
            .limit(+globalLimit)
            .skip((globalPage - 1) * +globalLimit);
        return {
            filter,
            length: data.length || 0,
            data: data || [],
            flag: true,
            message: "Getting data from API's",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            length: 0,
            flag: false,
            message: "Error occurs in Get Data End Point",
            desc: e.message,
        };
    }
};

const AddData = async () => {
    try {
        let result = GetDataMore50Less100();
        let GettingFromAPI = await axios.get(
            `https://randomuser.me/api/?results=${result}`
        );
        let dataRes = GettingFromAPI.data.results;
        // console.log('GettingFromAPI:', data)

        let data = await dataModel.insertMany(dataRes);
        // await data.save();

        let getD = await dataModel.find({});

        return {
            length: {
                addedLength: data.length || 0,
                allLength: getD.length || 0,
            },
            data: data,
            flag: true,
            message: `${data.length || 0} Item Added Successfully`,
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            flag: false,
            message: "Error occurs",
            desc: e.message,
        };
    }
};

const DeleteData = async () => {
    try {
        let data = await dataModel.deleteMany();
        return {
            length: data.length || 0,
            data: data || [],
            flag: true,
            message: "Data Deleted Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            length: 0,
            flag: false,
            message: "Error occurs in Get Data End Point",
            desc: e.message,
        };
    }
};

const GetDataFilter = async (filter) => {
    try {
        let name = filter.name || "";
        // console.log('name:', name)
        let country = filter.country || "";
        // console.log('country:', country)
        let gender = filter.gender || "";
        // console.log('gender:', gender);
        let ageL = filter.ageL || 100
        let ageR = filter.ageR || 0
        // console.log('age:', age)


        globalPage = filter.page;
        globalLimit = filter.limit;
        if (!filter.page) {
            globalPage = 1;
        }
        if (!filter.limit) {
            globalLimit = 10;
        }
        let data = [];

        data = await dataModel
            .find({
                "gender": gender || { $regex: gender, $options: "i" },
                "name.first": { $regex: name, $options: "i" },
                "location.country": country || { $regex: country, $options: "i", },
                $and: [{ "dob.age": { $lte: ageL, $gte: ageR } }],
                $caseSensitive: false
            })
            .limit(+globalLimit)
            .skip((globalPage - 1) * +globalLimit);

        let countryL = {};
        for (let i = 0; i < data.length; i++) {
            if (countryL[data[i].location.country] === undefined) {
                countryL[data[i].location.country] = 1
            } else {
                countryL[data[i].location.country]++
            }
            // console.log("country:", data[i].location.country);
        }

        const getD = await dataModel.find({});
        return {
            list: countryL,
            filter,
            length: {
                filterLength: data.length || 0,
                allLength: getD.length || 0,
            },
            data: data || [],
            flag: true,
            message: "Data Get Filter",
            desc: "",
        };
    } catch (e) {
        return {
            data: [],
            length: 0,
            flag: false,
            message: "Error occurs in Get Data End Point",
            desc: e.message,
        };
    }
};

module.exports = {
    GetData,
    AddData,
    DeleteData,
    GetDataFilter,
};
