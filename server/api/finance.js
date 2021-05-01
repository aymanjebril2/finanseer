import { Router } from "express";
import requireUser from "../middleware/requireUser.js";
import db from "../db/fileDB.js";

const getMonthlyItems = (request, response) => {
    const {
        month,
        year
    } = request.params;

    const {
        "user-id": userId
    } = request.cookies;

    const data = db.getMonthlyItems(userId, month, year);

    let total = 0;
    const [ income, expenses ] = data.reduce((acc, item) => {
        total += item.value;

        if (item.value >= 0) {
            acc.income.push(item);

            return acc;
        }

        acc.expenses.push({
            ...item,
            value: -1* value
        });

        return acc;
    }, { income: [], expenses: [] });

    response.status(200).json({
        success: true,
        month,
        year,
        total,
        income,
        expenses
    });
};

const addItem = (request, response) => {
    const {
        type
    } = request.params;

    if (!["income", "expense"].includes(type)) {
        response.status(400).json({ success: false, message: "parameter 'type' is invalid" });

        return;
    }

    const {
        "user-id": userId
    } = request.cookies;

    const {
        value,
    } = request.body;

    db.addItem(userId, {
        ...request.body,
        value: type === "income" ? value : -1 * value
    });

    response.status(200).json({ success: true });
};

export default () => {
    const router = Router();

    router.get('/monthly/:year/:month', requireUser, getMonthlyItems);
    router.post('/:type', requireUser, addItem);

    return router;
};