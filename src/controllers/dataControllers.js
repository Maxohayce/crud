const validator = require("validator");
const Data = require("../models/data");

//retrieve new data details from req body
exports.createNewData = (req, res) => {
  const { name, email, country } = req.body;

  if (!name || !email || !country) {
    return res.status(400).send({
      data: null,
      message: "All fields are required",
      error: true,
    });
  }

  // Email validation
  if (!validator.isEmail(email)) {
    return res.status(400).send({
      data: null,
      message: "Email is invalid",
      error: true,
    });
  }

  // Check if user already exists
  Data.findOne({ email, name, isDeleted: false })
    .then((found) => {
      if (found) {
        return res.status(409).send({
          data: null,
          message: "A user with this name or email already exists",
          error: true,
        });
      }

      const data = { name, email, country };

      const finalData = new Data(data);

      // Save user && return response
      return finalData
        .save()
        .then((r) =>
          res.status(201).send({
            data: r,
            message: "Data added successfully",
            error: false,
          })
        )
        .catch((err) =>
          res.status(500).send({
            data: null,
            message: err || "Internal server error",
            error: true,
          })
        );
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err || "Internal server error",
        error: true,
      })
    );
};

exports.fetchData = (req, res) =>
  Data.find({ isDeleted: false })
    .then((data) => {
      const isNotEmpty = data.length > 0;
      res.status(200).send({
        data,
        message: isNotEmpty
          ? "Data fetched successfully"
          : "No data created yet",
        error: false,
      });
    })
    .catch((err) =>
      res.status(500).send({ data: null, message: err, error: true })
    );

exports.fetchSingleData = (req, res) => {
  const { id } = req.params;

  return Data.findById(id)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        return res.status(404).send({
          data: null,
          message: "Data not found",
          error: true,
        });
      }
      res.status(200).send({
        data,
        message: "Data fetched successfully",
        error: false,
      });
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
};

exports.updateSingleBook = (req, res) => {
  const { id } = req.params;

  return Data.findById(id)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        return res.status(404).send({
          data: null,
          message: "Data not found",
          error: true,
        });
      }

      Data.findByIdAndUpdate(id, { ...req.body }, { new: true })
        .then((d) =>
          res.status(200).send({
            data: d,
            message: "Data updated successfully",
            error: false,
          })
        )
        .catch((err) =>
          res.status(500).send({
            data: null,
            message: err,
            error: true,
          })
        );
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
};

exports.deleteSingleData = (req, res) => {
  const { id } = req.params;

  return Data.findById(id)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        return res.status(404).send({
          data: null,
          message: "Data not found",
          error: true,
        });
      }
      Data.findByIdAndUpdate(id, { isDeleted: true }, { upsert: false })
        .then(() =>
          res.status(200).send({
            data,
            message: "Data deleted successfully",
            error: false,
          })
        )
        .catch((err) =>
          res.status(500).send({
            data: null,
            message: err,
            error: true,
          })
        );
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
};
