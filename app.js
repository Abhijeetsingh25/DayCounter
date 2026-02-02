const express = require("express")
const app = express();
const path = require("path")
const ejsMate = require("ejs-mate");
const {calculateDiff} = require("./utils/script");
const asyncWrap = require("./utils/asyncWrap");
const {validateCounter} = require("./mddleware");


app.engine("ejs" , ejsMate)
app.set("view engine" ,"ejs");
app.set("views" ,path.join(__dirname , "views"))
app.use(express.static (path.join(__dirname , "/public")) )
app.use(express.urlencoded({extended : true}))

// GET – form only
app.get("/counters", asyncWrap( async(req, res) => {
   await  res.render("listings/index.ejs");
}));

// POST – form + result
app.post("/counters", validateCounter , asyncWrap(async (req, res) => {
    const { startDate, endDate } = req.body;
    const result = calculateDiff(startDate, endDate);

    const counter = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        years: result.years,
        months: result.months,
        days: result.days,
        weeks: Math.floor(result.totalDays / 7),
        hours: result.totalDays * 24,
        minutes: result.totalDays * 24 * 60,
        seconds: result.totalDays * 24 * 60 * 60
    };
   
      await res.render("listings/index.ejs", { counter });
     
}));

app.get("/counters/about" ,asyncWrap( async(req , res)=> {
   await res.render("links/about.ejs");
}));
app.get("/counters/contact" ,asyncWrap( async(req , res)=> {
   await res.render("links/contact.ejs");
}))

app.use((err , req , res , next)=> {
    const {status = 500 , message = "Something went wrong"}  = err;
    res.status(status).render("error.ejs" , {err})
})

app.listen(8001 , ()=>{
    console.log("Server is running on port 8001");
})