class ApiFeatures {
    constructor(query,queryObject){
        this.query = query;       //it will contain all the data from db
        this.queryObject = queryObject       //keyword {query}
    }

    search(){
        // console.log(this.queryObject);
        const keyword = this.queryObject.keyword ? {
            name: { $regex: this.queryObject.keyword ,$options:"i" },
        } : {};

        // console.log(keyword); 
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryObject};
        const removeFileds = [ 'keyword' , 'page' , 'limit'];
        removeFileds.forEach((key)=> delete queryCopy[key]);
        // console.log(queryCopy);


        // price and rating filter
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
        this.query = this.query.find(JSON.parse(queryString));
        return this;

    }
}

module.exports = ApiFeatures;