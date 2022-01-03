const express = require("express");
const Work = require("../models/work.models");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const works = await Work.find({});
  res.status(200).json({ works });
});

const createTasks = asyncWrapper(async (req, res) => {
  const work = await Work.create(req.body);
  res.status(201).json({ work });
});

const getTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const work = await Work.findOne({ _id: taskID });
  if (!work) {
    return next(createCustomError(`No work with id : ${taskID}`, 404));
  }
  res.status(200).json({ work });
});

const deleteTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const work = await Work.findOneAndDelete({ _id: taskID });
  if (!work) {
    return next(createCustomError(`No work with id : ${taskID}`, 404));
  }
  res.status(200).json({ work });
});

const updateTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const work = await Work.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!work) {
    return next(createCustomError(`No work with id : ${taskID}`, 404));
  }
  res.status(200).json({ work });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
