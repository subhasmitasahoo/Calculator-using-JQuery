var num1 = "";
var nStack = [];
var opStack = [];
var op = "";
var invalid = false;
var precedence = {"+":1,"-":1,"*":2,"/":2};

function reset(){
	$("#result").fadeIn(1000,function(){
		$("#result").text("0");
	num1 = "";
	op = "";
	nStack = [];
	opStack = [];
	invalid = false;
	});
}
$("#clear").click(reset);

$(".num").click(function(){
	num1 += $(this).text();
	$("#result").text(num1);
});

function operate(num1, num2, op){
	switch(op){
		case "+":
			return Number(num1)+Number(num2);
		case "-":
			return Number(num2)-Number(num1);
		case "*":
			return Number(num1)*Number(num2);
		case "/":
			return Number(num2)/Number(num1);
	}
	return num1;
}

$(".op").click(function(){
	op = $(this).text();
	console.log(op);
	if(num1.length!=0)
		nStack.push(num1);
	if(nStack.length == opStack.length+1){
		if(opStack.length == 0){
			if(op!="=")
				opStack.push(op);
			else{
				$("#result").text(num1);
			}
		}
		else{
			if(op!="="){
				while(opStack.length!=0 && precedence[opStack[opStack.length-1]]>=precedence[op]){
					if(nStack.length>=2){
						var t1 = nStack[nStack.length-1];
						nStack.pop();
						var t2 = nStack[nStack.length-1];
						nStack.pop();
						t1 = operate(t1,t2,opStack[opStack.length-1]);
						console.log("operation "+t1);
						opStack.pop();
						nStack.push(t1);
					}
					else{
						$("#result").text("Invalid operation");
						invalid = true;
						$("#result").fadeOut(1000,reset);
						break;
					}
				}
				if(!invalid)
						opStack.push(op);
			}
			else{
				while(opStack.length!=0){
					if(nStack.length>=2){
						var t1 = nStack[nStack.length-1];
						nStack.pop();
						var t2 = nStack[nStack.length-1];
						nStack.pop();
						t1 = operate(t1,t2,opStack[opStack.length-1]);
						opStack.pop();
						nStack.push(t1);
					}
					else{
						$("#result").text("Invalid operation");
						invalid = true;
						$("#result").fadeOut(1000,reset);
						break;
					}
				}
				if(!invalid)
					$("#result").text(t1);
			}
		}	
		num1 = "";
	}
	else{
		$("#result").text("Invalid operation");
		$("#result").fadeOut(1000,reset);
	}
	console.log("nstack "+nStack);
	console.log("opStack "+opStack);

});
