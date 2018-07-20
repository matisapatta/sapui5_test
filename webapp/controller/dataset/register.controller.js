sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("pspredictive.controller.dataset.register", {
		onInit: function () {
			if (typeof sap.ui.getCore().getModel() === 'undefined') {
				this.getView().setModel(new sap.ui.model.json.JSONModel(), "dataset_register");
			}
		},
		register: function (oEvent) {
			// set the busy indicator to avoid multi clicks
			var oBusyIndicator = new sap.m.BusyDialog();
			oBusyIndicator.open();
			
			// define the service parameters
			// var param = {
			// 	hanaURL: oList.getSelectedItem().getKey()
			// };

			// get the current view
			var oView = this.getView();

			var _sociedad = this.getView().byId("sociedad").getSelectedItem().getKey();
			var _fechadesde = this.getView().byId("fechadesde").getProperty("value");
			var _fechahasta = this.getView().byId("fechahasta").getProperty("value");
			var _pendiente = this.getView().byId("pendiente").getSelectedItem().getKey();
			// console.log(_fechadesde,_pendiente);

			// get the model
			var oModel = oView.getModel("dataset_register");
			var json = {
				"ID":20,
				"facturas": [
					{ "key": 0, "factura": "0001-0000", "sociedad": "S001", "comprobante":"Fact A","fechadoc":"24/3/2018","impneto":50000,"impbruto":53000,"moneda":"ARS","op":"433","fechapago":"27/3/2018" },
					{ "key": 1, "factura": "0001-0001", "sociedad": "T001","comprobante":"Fact A","fechadoc":"25/3/2018","impneto":340000,"impbruto":347000,"moneda":"ARS","op":"435","fechapago":"30/3/2018" },
					{ "key": 2, "factura": "0002-0001", "sociedad": "T001","comprobante":"Fact A","fechadoc":"24/4/2018","impneto":2000,"impbruto":2200,"moneda":"USD","op":"478","fechapago":"29/4/2018" },
					{ "key": 3, "factura": "0002-0002", "sociedad": "T001","comprobante":"Fact A","fechadoc":"13/5/2018","impneto":255000,"impbruto":262900,"moneda":"ARS","op":"512","fechapago":"15/5/2018" },
					{ "key": 4, "factura": "0002-0003", "sociedad": "S002","comprobante":"Fact A","fechadoc":"17/5/2018","impneto":76000,"impbruto":76900,"moneda":"ARS","op":"517","fechapago":"26/5/2018" },
					{ "key": 5, "factura": "0002-0004", "sociedad": "S001","comprobante":"Fact A","fechadoc":"18/5/2018","impneto":30000,"impbruto":33000,"moneda":"ARS","op":"621","fechapago":"27/5/2018" },
					{ "key": 6, "factura": "0002-0005", "sociedad": "S001","comprobante":"Fact A","fechadoc":"01/6/2018","impneto":54700,"impbruto":56000,"moneda":"ARS","op":"789","fechapago":"04/6/2018" },
					{ "key": 7, "factura": "0003-0001", "sociedad": "S002","comprobante":"Fact A","fechadoc":"11/6/2018","impneto":20000,"impbruto":21000,"moneda":"USD","op":"799","fechapago":"16/6/2018" },
					{ "key": 8, "factura": "0003-0002", "sociedad": "S002","comprobante":"Fact A","fechadoc":"10/7/2018","impneto":90000,"impbruto":90500,"moneda":"BRL","op":"","fechapago":"" },
					{ "key": 9, "factura": "0001-0003", "sociedad": "S002","comprobante":"Fact A","fechadoc":"24/7/2018","impneto":3200,"impbruto":3000,"moneda":"USD","op":"","fechapago":"" },
					{ "key": 10, "factura": "0001-0011", "sociedad": "T001","comprobante":"Fact A","fechadoc":"25/7/2018","impneto":78000,"impbruto":80200,"moneda":"ARS","op":"","fechapago":"" }
				]
			}
			var xmlhttp = eval(json);
			var facturas = xmlhttp.facturas;
			var date = facturas[0].fechadoc;
			if(_fechadesde=="" || _fechahasta == ""){
				if(_pendiente == "si"){
					var filtered = facturas.filter(function (el) {
						return el.sociedad == _sociedad &&
							   el.fechapago == "";
					  });
				} else {
					var filtered = facturas.filter(function (el) {
						return el.sociedad == _sociedad &&
							   el.fechapago != "";
					  });
				}
			} else {
				if(_pendiente == "si"){
					var filtered = facturas.filter(function (el) {
						return el.sociedad == _sociedad &&
							   el.fechadoc.split('/')[2] + el.fechadoc.split('/')[1] + el.fechadoc.split('/')[0] >= 20+_fechadesde.split('/')[2]+_fechadesde.split('/')[1]+_fechadesde.split('/')[0] &&
							   el.fechadoc.split('/')[2] + el.fechadoc.split('/')[1] + el.fechadoc.split('/')[0] <= 20+_fechahasta.split('/')[2]+_fechahasta.split('/')[1]+_fechahasta.split('/')[0] &&
							   el.fechapago == "";
					  });
				} else {
					var filtered = facturas.filter(function (el) {
						return el.sociedad == _sociedad &&
						el.fechadoc.split('/')[2] + el.fechadoc.split('/')[1] + el.fechadoc.split('/')[0] >= 20+_fechadesde.split('/')[2]+_fechadesde.split('/')[1]+_fechadesde.split('/')[0] &&
						el.fechadoc.split('/')[2] + el.fechadoc.split('/')[1] + el.fechadoc.split('/')[0] <= 20+_fechahasta.split('/')[2]+_fechahasta.split('/')[1]+_fechahasta.split('/')[0] &&
						el.fechapago != "";
					  });
				}
			}
			
			
			//   var _fechadesde1 = _fechadesde.split('/');
			//   console.log(_fechadesde1)
			//   console.log(_fechahasta);
			//   console.log(date);

			oModel.setProperty("/dataset", filtered);
			oBusyIndicator.close();

			// call the service and define call back methods
			// $.ajax({
			// 	headers: {
			// 		'Accept': 'application/json',
			// 		'Content-Type': 'application/json'
			// 	},
			// 	url: "/ps/api/analytics/dataset/sync",
			// 	type: "POST",
			// 	crossDomain: true,
			// 	xhrFields: {
			// 		withCredentials: true
			// 	},
			// 	data: JSON.stringify(param),
			// 	dataType: "json",
			// 	async: true,
			// 	timeout: 3000000,
			// 	success: function(data) {
			// 		try {
			// 			//Save data set description data in the model
			// 			oModel.setProperty("/dataset", data);
			// 			oBusyIndicator.close();
			// 		} catch (err) {
			// 			MessageToast.show("Caught - dataset register[ajax success] :" + err.message);
			// 		}
			// 		oBusyIndicator.close();
			// 	},
			// 	error: function(request, status, error) {
			// 		MessageToast.show("Caught - dataset register[ajax error] :" + request.responseText);
			// 		oBusyIndicator.close();
			// 	}
			// });


		},
		onExit : function(){
			var oModel = oView.getModel("dataset_register");
			var facturas = {
				
			}
			oModel.setProperty("/dataset", facturas);
		}

	});
});