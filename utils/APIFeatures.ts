class APIFectures {
  dbQuery: any;
  urlQuery: any;

  constructor(dbQuery: any, urlQuery: any) {
    this.dbQuery = dbQuery;
    this.urlQuery = urlQuery;
  }

  search(field: string) {
    const search = this.urlQuery.search
      ? {
          [field]: {
            $regex: this.urlQuery.search,
            $options: "i",
          },
        }
      : {};

    this.dbQuery = this.dbQuery.find(search);
    return this;
  }

  filter() {
    const urlQueryCopy = { ...this.urlQuery };
    const removedFields = ["search"];
    removedFields.forEach((field) => delete urlQueryCopy[field]);

    this.dbQuery = this.dbQuery.find(urlQueryCopy);
    return this;
  }

  paginate() {
    const page = +this.urlQuery.page || 1;
    const limit = +this.urlQuery.limit || 30;
    const skip = limit * (page - 1);

    this.dbQuery = this.dbQuery.skip(skip).limit(limit);
    return this;
  }
}
