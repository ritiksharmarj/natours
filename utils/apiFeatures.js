class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Filtering: extract filters from query string
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|eq|ne)\b/g,
      (match) => `$${match}`
    ); // queryStr: { 'duration': { '$gte': '3' }}

    // Build query
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      /**
       * /api/v1/tours?sort=price,-ratingsAverage
       * sorting the tours by "price" in ascending order
       * "ratingsAverage" in descending order (denoted by the "-" before "ratingsAverage")
       *
       * equivalent - query.sort('price -ratingsAverage');
       */
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // If sort field empty then results should be sorted in descending order to show the newest document first.
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      /**
       * /api/v1/tours?fields=name,duration,difficulty,price
       * In this case, the response will only include the "name", "duration", "difficulty", and "price" fields, rather than returning all the fields of the tours resource.
       *
       * equivalent - query.select('name duration difficulty price');
       */
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
