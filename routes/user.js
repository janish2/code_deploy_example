
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

var mysql = require('./mysql');
/*
 * GET users listing.
 */
//var uname;
//LOGOUT FUNCTION
exports.logoutsession = function(req,res){
console.log("checking logout");	
req.session.destroy();
res.send({"status":200});
};
	
var process_status = 'pending';

//MAINTAINING SESSION LOGIN
exports.checklogin = function(req, res){
	console.log("checking session");
	console.log("req.session.uname"+req.session.uname);
	  if(req.session.cusnum)
		  {
		  console.log("session is"+req.session.uname);
		  res.send({"status":200});
		  }
	  else
		  {
		  if(req.session.empnum)
		  {
		  console.log("session is"+req.session.empnum);
		  res.send({"status":250});
		  }
		  else{
		  res.send({"status":300});
		  }}
	};

//LOGIN PAGE CUSTOMER
	exports.cussignin = function(req, res){
		
		console.log(req.param("cus_name"));
		console.log(req.param("cus_password"));
		var cus_name = req.param("cus_name");
		var cus_password = req.param("cus_password");
		
		var myquery = "Select * from customers where contactFirstName = '"+cus_name+"'and contactLastName='"+cus_password+"' ";
		mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
						{
						if(results.length > 0)
							{
						req.session.uname = results[0].contactFirstName;
						req.session.cusnum = results[0].customerNumber;
							console.log("success");
							res.render('customer');							
							} 
						else
							{
							console.log("Invalid User Name & Password");
							res.send({"status":100});	
							}

						}
					
				},myquery);
			};
			
//LOGIN PAGE EMPLOYEE
exports.empsignin = function(req, res){
	
	console.log(req.param("emp_name","emp_password"));
	var emp_name = req.param("emp_name");
	var emp_password = req.param("emp_password");
	
	var myquery = "Select * from employees where firstName = '"+emp_name+"'and lastName='"+emp_password+"' ";
	mysql.fetchData(function(err,results){
				if(err)
					{
						throw err;
					}
				else
					{
					if(results.length > 0)
						{
					req.session.empnum = results[0].employeeNumber;
						console.log("success");
						res.render('employee');							
						} 
					else
						{
						console.log("Invalid User Name & Password");
						res.send({"status":100});	
						}

					}
				
			},myquery);
		};			

//CUSTOMER PAGE
exports.customer = function(req, res)  {
	  res.render('customer');
};

//EMPLOYEE PAGE
exports.employee = function(req, res)  {
	  res.render('employee');
};

	
exports.searchorderdetails = function(req, res){
	console.log("req.session.cusnum");
	console.log(req.session.cusnum);
				var myquery="select * from orders where customerNumber = '"+req.session.cusnum+"'";
			
				console.log("Query is:"+myquery);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,myquery);
			};

			
exports.orderdetails = function(req, res){
	console.log("req.session.cusnum");
	console.log(req.session.cusnum);
				var myquery="select * from orders";
			
				console.log("Query is:"+myquery);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,myquery);
			};

exports.products = function(req, res){
				var myquery="select * from products";
			
				console.log("Query is:"+myquery);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,myquery);
			};

exports.employees = function(req, res){
	var myquery="select * from employees";

	console.log("Query is:"+myquery);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,myquery);
};


exports.getordercount = function(req, res){
	console.log("in get order count");
	console.log("req.session.cusnum");
	console.log(req.session.cusnum);
				var myquery="select count(*) count from orders where customerNumber = '"+req.session.cusnum+"'";
				console.log("Query is:"+myquery);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,myquery);
			};
			
exports.getordercountemp = function(req, res){
	console.log("in get order count");
	console.log("req.session.cusnum");
	console.log(req.session.cusnum);
				var myquery="select count(*) count from orders";
				console.log("Query is:"+myquery);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,myquery);
			};
exports.moreorderdetails = function(req, res){
	console.log(req.param("order_number"));
	var order_number = req.param("order_number");
				var myquery="select od.orderNumber, od.quantityOrdered, pr.productName, pr.productLine, pr.buyPrice from orderdetails od, products pr where od.orderNumber = '"+order_number+"' and od.productCode=pr.productCode";
			
				console.log("Query is:"+myquery);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,myquery);
			};