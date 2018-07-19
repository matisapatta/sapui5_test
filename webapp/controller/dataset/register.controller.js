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
			var oList = this.getView().byId(oEvent.getSource().getCustomData()[0].getValue());
			var _sociedad = oList.getSelectedItem().getKey();
			console.log(_sociedad);
			// define the service parameters
			// var param = {
			// 	hanaURL: oList.getSelectedItem().getKey()
			// };

			// get the current view
			var oView = this.getView();

			// get the model
			var oModel = oView.getModel("dataset_register");
			var facturas = {
				"ID": 20,
				"variables": [
					{ "key": 0, "factura": "0001-0000", "sociedad": "S001", "comprobante":"Fact A","fechadoc":"24/03/2018","impneto":50000,"impbruto":53000,"moneda":"ARS","op":"433","fechapago":"27/03/2018" },
					{ "key": 1, "factura": "0001-0001", "sociedad": "T001","comprobante":"Fact A","fechadoc":"25/03/2018","impneto":340000,"impbruto":347000,"moneda":"ARS","op":"435","fechapago":"30/03/2018" },
					{ "key": 2, "factura": "0002-0001", "sociedad": "T001","comprobante":"Fact A","fechadoc":"24/04/2018","impneto":2000,"impbruto":2200,"moneda":"USD","op":"478","fechapago":"29/04/2018" },
					{ "key": 3, "factura": "0002-0002", "sociedad": "T001","comprobante":"Fact A","fechadoc":"13/05/2018","impneto":255000,"impbruto":262900,"moneda":"ARS","op":"512","fechapago":"15/05/2018" },
					{ "key": 4, "factura": "0002-0003", "sociedad": "S002","comprobante":"Fact A","fechadoc":"17/05/2018","impneto":76000,"impbruto":76900,"moneda":"ARS","op":"517","fechapago":"26/05/2018" },
					{ "key": 5, "factura": "0002-0004", "sociedad": "S001","comprobante":"Fact A","fechadoc":"18/05/2018","impneto":30000,"impbruto":33000,"moneda":"ARS","op":"621","fechapago":"27/05/2018" },
					{ "key": 6, "factura": "0002-0005", "sociedad": "S001","comprobante":"Fact A","fechadoc":"01/06/2018","impneto":54700,"impbruto":56000,"moneda":"ARS","op":"789","fechapago":"04/06/2018" },
					{ "key": 7, "factura": "0003-0001", "sociedad": "S002","comprobante":"Fact A","fechadoc":"11/06/2018","impneto":20000,"impbruto":21000,"moneda":"USD","op":"799","fechapago":"16/06/2018" },
					{ "key": 8, "factura": "0003-0002", "sociedad": "S002","comprobante":"Fact A","fechadoc":"10/07/2018","impneto":90000,"impbruto":90500,"moneda":"BRL","op":"","fechapago":"" },
					{ "key": 9, "factura": "0001-0003", "sociedad": "S002","comprobante":"Fact A","fechadoc":"24/07/2018","impneto":3200,"impbruto":3000,"moneda":"USD","op":"","fechapago":"" },
					{ "key": 10, "factura": "0001-0011", "sociedad": "T001","comprobante":"Fact A","fechadoc":"25/07/2018","impneto":78000,"impbruto":80200,"moneda":"ARS","op":"","fechapago":"" }
				]
			}
			oModel.setProperty("/dataset", facturas);
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