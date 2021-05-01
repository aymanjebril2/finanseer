import { Router } from "express";
import requireUser from "../middleware/requireUser.js";
import db from "../db/fileDB.js";

const getOverview = (request, response) => {
    const userId = request.userId; // added by requireUser middleware

    const data = db.getItems(userId);

    const transactions = data.map((item) => {
        if (item.amount >= 0) {
            return {
                ...item,
                type: "Income"
            };
        }

        return {
            ...item,
            amount: -1 * item.amount,
            type: "Expense"
        };
    });

    response.status(200).json({
        success: true,
        transactions
    });
};

const getMonthlyItems = (request, response) => {
    const {
        month,
        year
    } = request.params;

    const userId = request.userId; // added by requireUser middleware

    const data = db.getMonthlyItems(userId, month, year);

    let total = 0;
    const [ income, expenses ] = data.reduce((acc, item) => {
        total += item.amount;

        if (item.amount >= 0) {
            acc.income.push({
                ...item,
                type: "Income"
            });

            return acc;
        }

        acc.expenses.push({
            ...item,
            amount: -1 * amount,
            type: "Expense"
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

    if (!["Income", "Expense"].includes(type)) {
        response.status(400).json({ success: false, message: "parameter 'type' is invalid" });

        return;
    }

    const userId = request.userId; // added by requireUser middleware

    const {
        amount,
    } = request.body;

    db.addItem(userId, {
        ...request.body,
        amount: type === "Income" ? amount : -1 * amount
    });

    response.status(200).json({ success: true });
};

const deleteItem = (request, response) => {
    const {
        id
    } = request.params;

    const userId = request.userId; // added by requireUser middleware

    try {
        db.deleteItem(userId, id);

        response.status(200).json({ success: true });
    } catch (error) {
        console.error(error);

        response.status(404).json({ success: false, message: error.message });
    }
};

export default () => {
    const router = Router();

    router.get('/overview', requireUser, getOverview);
    router.get('/monthly/:year/:month', requireUser, getMonthlyItems);
    router.post('/:type', requireUser, addItem);
    router.delete('/:id', requireUser, deleteItem);

    return router;
};
