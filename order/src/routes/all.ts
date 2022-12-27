import express from "express";

const orderGetAllRouter = express.Router();

orderGetAllRouter.get("/orders", async (req, res) => {
  return res.send("get all route");
});

export { orderGetAllRouter };
