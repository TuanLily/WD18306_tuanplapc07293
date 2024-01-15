/**
 * Viết một arrow function có tên là convertTemperature, nhận vào hai tham số: temperature và unit. temperature là một số nguyên hoặc số thập phân, và unit là một chuỗi biểu thị đơn vị nhiệt độ ("C" cho Celsius hoặc "F" cho Fahrenheit).
Hàm này sẽ quy đổi nhiệt độ từ đơn vị hiện tại sang đơn vị khác. Nếu unit là "C", hãy chuyển nhiệt độ sang Fahrenheit và ngược lại.
Công thức chuyển đổi là: Celsius sang Fahrenheit: (C * 9/5) + 32, ngược lại là Fahrenheit sang Celsius: (F - 32) * 5/9.

*/

const convertTemperature = (temperature, unit) =>{
    if(unit = "C"){
        return (temperature * 9/5) + 32;
    }
    else if(unit = "F"){
        return (temperature - 32 ) + 5/9;
    }else{
        alert("Giá trị bạn truyền vào để biến đổi không hợp lệ");
    }
};

const doC = 35;
const doF = 22;

console.log(convertTemperature(doC, "C"));
console.log(convertTemperature(doF, "F"));

