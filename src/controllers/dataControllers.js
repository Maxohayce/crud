const Data = require("../models/data");

  //retrieve new data details from req body
exports.createNewData = (req, res) => {

    const {name, email, country} = req.body

    if(!name || !email || !country)

  Data.create(
    {
      name: req.body.name,
      email: req.body.email,
      Country: req.body.country,
    },
    (err, newData) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        return res.status(200).json({ message: "new data created", newData });
      }
    }
  );}

exports.fetchData = (req, res) =>
  Data.find({ isDeleted: false })
    .then((data) => {
      const isNotEmpty = data.length > 0;
      res.status(200).send({
        data,
        message: isNotEmpty
          ? "Data fetched successfully"
          : "No data created yet",
      });
    })
    .catch((err) => res.status(500).send({ data: null, message: err }));

exports.fetchSingleData = (req, res) => {
  Data.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!data) {
      return res.status(404).json({ message: "data not found" });
    } else {
      return res.status(200).json({ data });
    }
  });
};

exports.updateSingleBook = (req, res) => {
  Data.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!data) {
        return res.status(404).json({ message: "book not found" });
      } else {
        data.save((err, savedData) => {
          if (err) {
            return res.status(400).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "data updated successfully" });
          }
        });
      }
    }
  );
};

exports.deleteSingleData = (req, res) => {
  Data.findByIdAndDelete(req.params.id, (err, book) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!data) {
      return res.status(404).json({ message: "book was not found" });
    } else {
      return res.status(200).json({ message: "book deleted successfully" });
    }
  });
};
