const catchAsync = require("../utils/catchAsync");
const Journal = require("../model/journalModel");
const User = require("../model/userModel");
const AppError = require("../utils/appError");

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

  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

const isSameUser = (dataId, userId) => {
  return dataId.toString() === userId.toString();
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
  if (!data) {
    return next(new AppError("No entry found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    lastEntry: data[0]?.date,
    totalEntries: data.length,
    data,
  });
});
exports.getOneJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.findById(req.params.id);
  const sameUser = isSameUser(data.userId, req.user._id);

  if (!data || !sameUser) {
    return next(new AppError("No entry found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.updateJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.findById(req.params.id);

  if (!data) {
    return next(new AppError("No entry found with that ID", 404));
  }

  const sameUser = isSameUser(data.userId, req.user._id);
  if (!sameUser) {
    return next(
      new AppError("You are not authorized to update this entry", 403)
    );
  }

  await Journal.updateOne({ _id: req.params.id }, req.body, {
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Journal entry updated successfully",
  });
});

exports.deleteJournal = catchAsync(async (req, res, next) => {
  const data = await Journal.findById(req.params.id);
  const sameUser = isSameUser(data.userId, req.user._id);

  if (!data || !sameUser) {
    return next(new AppError("No entry found with that ID", 404));
  }

  await Journal.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.me = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.user._id);
  if (!data) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});
