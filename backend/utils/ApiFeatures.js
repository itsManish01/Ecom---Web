class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;       //it will contain all the data from db
        this.queryStr = queryStr       //keyword {query}
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: { $regex: this.queryStr.keyword ,$options:"i" },
        } : {};

        // console.log(keyword); 
        this.query = this.query.find({...keyword});
        return this;
    }
}

module.exports = ApiFeatures;