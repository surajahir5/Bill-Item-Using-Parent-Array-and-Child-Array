var _DocObj = null;
(function () {
    'use strict';

    app.controller('ContractCtrl', ["$rootScope", "$scope", "$timeout", "$modal", "$route", "$routeParams", "$location", "$sce", "$templateCache", "$filter",
        "$q", "$http", "$compile", "blockUI",
        function ($rs, $scope, $timeout, $modal, $route, $routeParams, $index,$location, $sce, $templateCache, $filter, $q, $http, $compile, blockUI) {

            _DocObj = new PageObj($rs, $scope, $timeout, $index, $modal, $route, $routeParams, $location, $sce, $templateCache, $filter, $q, $http, $compile, blockUI);

            _DocObj.Init();
            _DocObj.BindFormEvents();

            _DocObj.ParseDatePickerCtrl();
            var dataList = [];
            _DocObj.ParseDropdownCtrl("", ".select2_single");
            InitpartySection();
            _DocObj.$scope.AddExpenseDtl = function (index) {
                debugger
                $('#ExpenseDtlDialog').modal();
                _DocObj.$scope.expenseIndex = index;
            }
            _DocObj.$scope.deleteExpense = function (item, index) {
                   item.AddExpenseDtls.splice(index, 1);
              };

        }
    ]);



    app.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            },
        };
    });
})(window.angular);


function Aggrementform() {
    var mUrl = _RootURL + 'Rent/Agreement/New';
    window.location.href = mUrl;
    return false;
}


function GetData() {
    debugger
    var dataList = [];
    var data = {
        ContractName: document.getElementById("txtContract") ? document.getElementById("txtContract").value : "",
        Branch: document.getElementById("Branch") ? document.getElementById("Branch").value : "",
        ContractType: document.getElementById("ContractType") ? document.getElementById("ContractType").value : "",
        Period: document.getElementById("txtPeriod") ? document.getElementById("txtPeriod").value : "",
        FromDate: document.getElementById("txtFromDate") ? document.getElementById("txtFromDate").value : "",
        ToDate: document.getElementById("txtToDate") ? document.getElementById("txtToDate").value : "",
        ContractStatus: document.querySelector('input[name="ContractStatus"]:checked') ? document.querySelector('input[name="ContractStatus"]:checked').value : ""
    };
    dataList.push(data);
    return dataList;
}

function InitpartySection($scope) {
    _DocObj.$scope.PartyDtlsLst
    debugger
    var hiddPartyDtls = $("#hiddPartyDtls").val();

    if (hiddPartyDtls != "") {
        hiddPartyDtls = JSON.parse(hiddPartyDtls);
    }
    else {
        hiddPartyDtls = [];
    }
    if (hiddPartyDtls == '') {
        _DocObj.$scope.PartyDtlsLst = [];
    }
    else {
        _DocObj.$scope.PartyDtlsLst = hiddPartyDtls;
    }

    debugger
    _DocObj.$scope.BillSetupDtls = [];
  
}

function AddPartyDtls() {
    $('#CanCreateVoucherDialog').modal();
}
function AddBillsetup() {
    $('#BillSetupDialog').modal();
}

function GetPartydata() {
    debugger

    var dataList = [];
    var partyName = document.getElementById('txtParty').value;
    var entities = document.getElementById('txtEntities').value;
    var type = document.getElementById('txtType').value;
    var data = {
        PartyName: partyName,
        Entities: entities,
        Type: type
    };
    dataList.push(data);
    dataList.forEach(function (item) {
        var mCount = _DocObj.$scope.PartyDtlsLst.length + 1;
        debugger
        _DocObj.$scope.PartyDtlsLst.push({
            RowId: mCount,
            Party: item.PartyName,
            Entities: item.Entities,
            Types: item.Type
        });
        _DocObj.$scope.$applyAsync();
    });
}

// add expense data puch in child 
function GetExpensedata() {

    debugger
    var mExpenseName = document.getElementById('txtExpenseName').value;
    var mExpense = document.getElementById('txtExpense').value;
    var data = {
        ExpenseName: mExpenseName,
        Expense: mExpense
    };
    var index = _DocObj.$scope.expenseIndex;
    _DocObj.$scope.BillSetupDtls[index].AddExpenseDtls.push(data);
    _DocObj.$scope.$applyAsync();

    document.getElementById('txtExpenseName').value = '';
    document.getElementById('txtExpense').value = '';
}

// Add bill data push
function GetBilldata() {
    debugger
    var dataList = [];
    debugger
    var mContract = document.getElementById('txtContractName').value;
    var mPaymentRent = document.querySelector('input[name="Monthly"]:checked') ? 'Monthly' : 'Quaterly';
    var mBillPeriodFrom = document.getElementById('txtBillPeriodFrom').value;
    var mExpBillDate = document.getElementById('txtExpBillDate').value;
    var mAgreementTitle = document.getElementById('txtAgreementTitle').value;
    var mBillPeriodTo = document.getElementById('txtBillPeriodTo').value;
    var mExpBillDueDate = document.getElementById('txtExpBillDueDate').value;

    var data = {
        Contract: mContract,
        PaymentRent: mPaymentRent,
        BillPeriodFrom: mBillPeriodFrom,
        ExpBillDate: mExpBillDate,
        AgreementTitle: mAgreementTitle,
        BillPeriodTo: mBillPeriodTo,
        ExpBillDueDate: mExpBillDueDate
    };

    dataList.push(data);

    dataList.forEach(function (item) {
        var mCount = _DocObj.$scope.BillSetupDtls.length + 1;
        _DocObj.$scope.BillSetupDtls.push({
            RowId: mCount,
            Contract: item.Contract,
            PaymentRent: item.PaymentRent,
            BillPerFrom: item.BillPeriodFrom,
            ExpBillDate: item.ExpBillDate,
            AgreementTitle: item.AgreementTitle,
            BillPeriodTo: item.BillPeriodTo,
            ExpBillDueDate: item.ExpBillDueDate,
            AddExpenseDtls: []
        });


 
    debugger

    document.getElementById('txtContractName').value = '';
    document.getElementById('txtBillPeriodFrom').value = '';
    document.getElementById('txtExpBillDate').value = '';
    document.getElementById('txtAgreementTitle').value = '';
    document.getElementById('txtBillPeriodTo').value = '';
    document.getElementById('txtExpBillDueDate').value = '';
    _DocObj.$scope.$applyAsync();

}
