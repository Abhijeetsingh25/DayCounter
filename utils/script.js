function calculateDiff(start , end){
    const startDate = new Date(start);
    const endDate = new Date(end);

    endDate.setDate(endDate.getDate()-1);

    const msPerDay = 1000*60*60*24;   
    const totalDays = Math.floor((endDate -startDate)/msPerDay)
     let years = endDate.getFullYear()-startDate.getFullYear();
     let months = endDate.getMonth()-startDate.getMonth();
     let days = endDate.getDate()-startDate.getDate();

     if(days < 0){
        months--;
        const prevMonth = new Date(endDate.getFullYear() , endDate.getMonth() , 0);
        days += prevMonth.getDate();
     }
     if(months < 0){
         years--;
         months +=12;
     }
       const totalMonths = years*12 + months;
     return { totalDays , years , months , days , totalMonths};
   
};

module.exports = {calculateDiff}