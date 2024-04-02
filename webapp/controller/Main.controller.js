sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        var oController;
        return Controller.extend("project3.controller.Main", {
            /**
             * @override
             */
            onAfterRendering: function () {
                oController = this;
            },

            onListItem: function (oEvent) {
                // var oKisi = this.getView().byId("idKisilerList").getSelectedContexts()[0].getObject();
                // var kisi  = new JSONModel();
                // kisi.setData(oKisi);
                // if(!this._KisiDetayDialog){
                //     this._KisiDetayDialog = sap.ui.xmlfragment("project3.fragments.KisiDetay", this);
                //     this._KisiDetayDialog.setModel(kisi, "kisi");
                // }
                // this._KisiDetayDialog.open();


                //BURA ÇALIŞIYOR
                var sPath = this.getView().byId("idKisilerList").getSelectedContextPaths()[0];
                var oView = this.getView();
                var oModel = oView.getModel();
                var mParameters = {};
                mParameters.success = function (oData, oResponce) {
                    debugger;
                    var kisi = new JSONModel();
                    kisi.setData(oData);
                    if (!oController._KisiDetayDialog) {
                        oController._KisiDetayDialog = sap.ui.xmlfragment("project3.fragments.KisiDetay", oController);
                        oController._KisiDetayDialog.setModel(kisi, "kisi");
                    }
                    oController._KisiDetayDialog.open();
                };
                mParameters.error = function (oError) {
                    debugger;
                };
                oModel.read(sPath, mParameters);

                // var oKisi = this.getView().byId("idKisilerList").getSelectedContexts()[0].getObject();
                // this.getRouter().navTo("detail",{ value : oKisi.KisiId });

            },

            onCloseDialog: function () {

                this._KisiDetayDialog.destroy();
                this._KisiDetayDialog = null;
            },

            onKisiEkle: function () {
                debugger;
                var kisi = new JSONModel();
                if (!oController._KisiEkleDialog) {
                    oController._KisiEkleDialog = sap.ui.xmlfragment("project3.fragments.KisiEkle", oController);
                    oController._KisiEkleDialog.setModel(kisi, "kisi");

                }
                oController._KisiEkleDialog.open();
            },

            onEkle: function () {
                var oKisi = this._KisiEkleDialog.getModel("kisi").getData();
                var oView = this.getView();
                var oModel = oView.getModel();
                var mParameters = {};
                mParameters.success = function (oData, oResponce) {
                    oController.onCloseDialog2();
                    //Modelde yaptığımız değişiklikleri ekrana yansımasıdır
                    oModel.refresh(true);
                    oModel.updateBindings(true);
                };
                mParameters.error = function (oError) {
                    debugger;
                };
                oModel.create("/KisilerSet", oKisi, mParameters);

            },

            onCloseDialog2: function () {

                this._KisiEkleDialog.destroy();
                this._KisiEkleDialog = null;
            },

            onKisiSil: function () {

                debugger;
                //1.Yöntem
                var sPath = this.getView().byId("idKisilerList").getSelectedContextPaths()[0];
                var oView = this.getView();
                var oModel = oView.getModel();
                var mParameters = {};

                var dialog = new sap.m.Dialog("idDialog", {
                    content: [
                        new sap.m.Label({
                            text: "Silme İşlemini Onaylıyor musunuz?"
                        })
                    ],

                    beginButton: new sap.m.Button({
                        text: "Evet",
                        press: function () {

                            mParameters.success = function (oData, oResponce) {
                                debugger;
                                dialog.close();
                            };
                            mParameters.error = function (oError) {
                                debugger;
                                dialog.close();
                            };
                            oModel.remove(sPath, mParameters);
                        }
                    }),

                    endButton: new sap.m.Button({
                        text: "Hayır",
                        press: function () {
                            dialog.close();

                        }
                    }),
                });
                dialog.open();

            },
            onKisiDuzenle: function () {
                //  debugger;   
                var oKisi = this.getView().byId("idKisilerList").getSelectedContexts()[0].getObject();
                var kisi = new JSONModel();
                kisi.setData(oKisi);
                if (!oController._KisiDuzenleDialog) {
                    oController._KisiDuzenleDialog = sap.ui.xmlfragment("project3.fragments.KisiDuzenle", oController);
                    oController._KisiDuzenleDialog.setModel(kisi, "kisi");
                }
                oController._KisiDuzenleDialog.open();

            },
            onDuzenle: function () {
                debugger;
                var oKisi = oController._KisiDuzenleDialog.getModel("kisi").getData();
                var sPath = "/KisilerSet('" + oKisi.KisiId + "')";
                var oView = this.getView();
                var oModel = oView.getModel();
                var mParameters = {};
                mParameters.success = function (oData, oResponce) {
                    oController._KisiDuzenleDialog.close();
                    oController.onCloseDialog3();
                };
                mParameters.error = function (oError) {
                    oController._KisiDuzenleDialog.close();
                    oController.onCloseDialog3();
                };
                oModel.update(sPath, oKisi, mParameters);
            },
            onCloseDialog3: function () {
                oController._KisiDuzenleDialog.destroy();
                oController._KisiDuzenleDialog = null
            },
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            }
        });

    });
