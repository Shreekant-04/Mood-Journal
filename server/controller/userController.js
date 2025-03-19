const catchAsync = require("../utils/catchAsync");
const Journal = require("../model/journalModel");
const User = require("../model/userModel");

const fetchQuote = async () => {
  const url =
    "https://quotes-api12.p.rapidapi.com/quotes/random?type=inspirational";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ff4b65086dmsh91d5252237e5ba6p1fbc59jsne10fbe0bc31b",
      "x-rapidapi-host": "quotes-api12.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    next(error);
  }
};

exports.create = catchAsync(async (req, res, next) => {
  const data = {
    userId: req.user._id,
    title: req.body.title,
    content: req.body.content,
    mood: req.body.mood,
  };
  await Journal.create(data);
  const quote = await fetchQuote();

  res.status(201).json({
    status: "success",
    message: "Journal entry created successfully",
    quote,
  });
});
exports.getAllJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.find(
    { userId: req.user._id },
    { userId: 1, title: 1, mood: 1, date: 1 }
  ).sort({ date: -1 });

  res.status(200).json({
    status: "success",
    data,
  });
});
exports.getOneJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.findById(req.params.id);
  if (!data) {
    return res.status(404).json({
      status: "fail",
      message: "No entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.updateJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return res.status(404).json({
      status: "fail",
      message: "No entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data,
  });
});
exports.deleteJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.findByIdAndDelete(req.params.id);
  if (!data) {
    return res.status(404).json({
      status: "fail",
      message: "No entry found with that ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.me = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.user._id);
  if (!data) {
    return res.status(404).json({
      status: "fail",
      message: "No user found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data,
  });
});
