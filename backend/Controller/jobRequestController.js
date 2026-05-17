import jobRequestModel from "../Model/jobRequestModel.js";

export const GetAllPostedJobs = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const allJobs = await jobRequestModel.find(query);
    return res.status(200).json({ allJobs });

  } catch (err) {
    next(err);
  }
};

export const createJobPost = async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;

    if (!title || !description || !category || !location || !contactEmail) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newJob = new jobRequestModel({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      userId: req.user.id
    });

    const savedJob = await newJob.save();
    return res.status(201).json({ savedJob, message: "Job successfully posted" });
  } catch (err) {
    next(err);
  }
};

export const getJobsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobRequestModel.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

export const updateJobStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedJob = await jobRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (err) {
    next(err);
  }
};

export const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJob = await jobRequestModel.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job successfully deleted" });
  } catch (err) {
    next(err);
  }
};

export const getMyPosts = async (req, res, next) => {
  try {
    const myJobs = await jobRequestModel.find({ userId: req.user.id });
    return res.status(200).json({ allJobs: myJobs });
  } catch (err) {
    next(err);
  }
};
