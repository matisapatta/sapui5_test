sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("pspredictive.controller.dataset.register", {
		onInit: function() {
			if (typeof sap.ui.getCore().getModel() === 'undefined') {
				this.getView().setModel(new sap.ui.model.json.JSONModel(), "dataset_register");
			}
		},
		register: function(oEvent) {
			// set the busy indicator to avoid multi clicks
			var oBusyIndicator = new sap.m.BusyDialog();
			oBusyIndicator.open();

			var oList = this.getView().byId(oEvent.getSource().getCustomData()[0].getValue());
			// define the service parameters
			var param = {
				hanaURL: oList.getSelectedItem().getKey()
			};

			// get the current view
			var oView = this.getView();

			// get the model
			var oModel = oView.getModel("dataset_register");

			// call the service and define call back methods
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				url: "/ps/api/analytics/dataset/sync",
				type: "POST",
				data: JSON.stringify(param),
				dataType: "json",
				async: true,
				timeout: 3000000,
				success: function(data) {
					try {
						//Save data set description data in the model
						oModel.setProperty("/dataset", data);
						oBusyIndicator.close();
					} catch (err) {
						MessageToast.show("Caught - dataset register[ajax success] :" + err.message);
					}
					oBusyIndicator.close();
				},
				error: function(request, status, error) {
					MessageToast.show("Caught - dataset register[ajax error] :" + request.responseText);
					oBusyIndicator.close();
				}
			});
		}
	});
});

