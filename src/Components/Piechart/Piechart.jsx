import React from "react";
import {PieChart ,Pie, Cell,Tooltip,Legend,ResponsiveContainer} from "recharts";
import "./piechart.css";

const filterCategory=(data)=>{
    const pieChartCategory={}
    console.log(data)
    data.forEach(element => {
        if(pieChartCategory[element.category]){
            pieChartCategory[element.category]+=parseInt(element.price,10);
        }
        else{
            pieChartCategory[element.category]=parseInt(element.price,10);
        }
    });
    return Object.keys(pieChartCategory).map((category,idx)=>({
        id:idx,
        name:category,
        value:pieChartCategory[category]
    }))
}
// const percentagelabel=(name,percentage)=>{
//     return(
//     <text fill="#fff" textAnchor="middle" dominantBaseline="middle">
//         {`${name} ${Math.round(percentage*100)}%`}
//     </text>
//     )
// }
const Piechart=({expense})=>{
    console.log(Array.isArray(expense));
    console.log(expense)
    const color=["#FF9304","#A000FF","#FDE006"];
    const radian=Math.PI/180;
    const percentagelabel=({cx,cy,midAngle,innerRadius,outerRadius,percent,idx})=>{
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);
   return(
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
   )
    }
    const pieChartData=filterCategory(expense);
    return(
       
        <ResponsiveContainer width="100%" height={300}>
    <PieChart width={300} height={300}>
        <Pie
        data={pieChartData}
        cx="50%"
        cy="50%"
        fill="#FF9304"
        dataKey="value"
        outerRadius={100}
        isAnimationActive={true}
        label={percentagelabel}
        >
            {pieChartData.map((item,idx)=>(
                <Cell key={`cell-${item.id}`} fill={color[item.id%color.length]}/>
            ))}
            </Pie>
            <Tooltip/>
            <Legend style={{position:"absolute", bottom:"2rem"}}/>
    </PieChart>
    </ResponsiveContainer>
    
    )
}

export default Piechart;