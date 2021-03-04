const db = require('../models/orderModels');

const menuController = {};

let counter = 0;

menuController.addOrder = (req, res, next) => {
  // make a repeated query string
  let str = [];
  for (let key in req.body.data) {
    let query = `(${counter}, ${req.body.foodArray.split(',').indexOf(key)}, ${
      req.body.data[key]
    })`;
    str.push(query);
  }
  const queryStr = `INSERT INTO public.order (order_id, menu_id, count)
                    VALUES ${str.join(', ')} RETURNING *`;
  // console.log(queryStr);
  db.query(queryStr)
    .then((respond) => {
      counter++;
      next();
    })
    .catch((e) => next(e));
};

menuController.getOrder = (req, res, next) => {
  const queryStr = `SELECT order_id,  public.menu.item AS food, count, public.menu.cuisine AS cuisine
                    FROM public.order
                    LEFT OUTER JOIN public.menu
                    ON public.order.menu_id = public.menu._id
                    ORDER BY order_id`;

  const queryGrouStr = `SELECT CAST(SUM(count) AS FLOAT), public.menu.cuisine AS cuisine
                        FROM public.order
                        LEFT OUTER JOIN public.menu
                        ON public.order.menu_id = public.menu._id
                        WHERE cuisine <> 'null'
                        GROUP BY cuisine`;
  db.query(queryGrouStr)
    .then((respond) => {
      // console.log(respond.rows);
      res.locals.data = respond.rows;
      next();
    })
    .catch((e) => next(e));
};

module.exports = menuController;
