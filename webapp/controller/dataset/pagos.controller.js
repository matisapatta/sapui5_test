sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("pspredictive.controller.dataset.pagos", {
		onInit: function () {
			if (typeof sap.ui.getCore().getModel() === 'undefined') {
				this.getView().setModel(new sap.ui.model.json.JSONModel(), "dataset_pagos");
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

			var _sociedad = this.getView().byId("sociedad1").getSelectedItem().getKey();
			var _fechadesde = this.getView().byId("fechadesde1").getProperty("value");
			var _fechahasta = this.getView().byId("fechahasta1").getProperty("value");
			// console.log(_fechadesde,_pendiente);

			// get the model
			var oModel = oView.getModel("dataset_pagos");
			var json = {
				"ID":20,
				"pagos": [
					{ "key": 0, "sociedad": "S001","impneto":50000,"impbruto":53000,"moneda":"ARS","op":"433","fechapago":"27/3/2018","formapago":"Cheque","nrocheque":"100-100","lugar":"Banco Galicia" },
					{ "key": 1,  "sociedad": "T001","impneto":340000,"impbruto":347000,"moneda":"ARS","op":"435","fechapago":"30/3/2018","formapago":"Cheque","nrocheque":"120-100","lugar":"Banco Galicia" },
					{ "key": 2,  "sociedad": "T001","impneto":2000,"impbruto":2200,"moneda":"USD","op":"478","fechapago":"29/4/2018","formapago":"Cheque","nrocheque":"340-1210","lugar":"Banco Santander" },
					{ "key": 3,  "sociedad": "T001","impneto":255000,"impbruto":262900,"moneda":"ARS","op":"512","fechapago":"15/5/2018","formapago":"Cheque","nrocheque":"256-100","lugar":"Banco Piano" },
					{ "key": 4,  "sociedad": "S002","impneto":76000,"impbruto":76900,"moneda":"ARS","op":"517","fechapago":"26/5/2018" ,"formapago":"Cheque","nrocheque":"789-130","lugar":"Banco Francés"},
					{ "key": 5,  "sociedad": "S001","impneto":30000,"impbruto":33000,"moneda":"ARS","op":"621","fechapago":"27/5/2018","formapago":"Cheque","nrocheque":"89-12345","lugar":"Banco Francés" },
					{ "key": 6,  "sociedad": "S001","impneto":54700,"impbruto":56000,"moneda":"ARS","op":"789","fechapago":"04/6/2018","formapago":"Cheque","nrocheque":"103-555","lugar":"Banco Santander" },
					{ "key": 7,  "sociedad": "S002","impneto":20000,"impbruto":21000,"moneda":"USD","op":"799","fechapago":"16/6/2018","formapago":"Cheque","nrocheque":"61234-20","lugar":"Banco Galicia" }
				]
			}
			var xmlhttp = eval(json);
			var pagos = xmlhttp.pagos;
			
			if(_fechadesde=="" || _fechahasta == ""){
				
					var filtered = pagos.filter(function (el) {
						return el.sociedad == _sociedad;
					  });
			} else {
			
					var filtered = pagos.filter(function (el) {
						return el.sociedad == _sociedad &&
							   el.fechapago.split('/')[2] + el.fechapago.split('/')[1] + el.fechapago.split('/')[0] >= 20+_fechadesde.split('/')[2]+_fechadesde.split('/')[1]+_fechadesde.split('/')[0] &&
							   el.fechapago.split('/')[2] + el.fechapago.split('/')[1] + el.fechapago.split('/')[0] <= 20+_fechahasta.split('/')[2]+_fechahasta.split('/')[1]+_fechahasta.split('/')[0];

					  });
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
		

	});
});
