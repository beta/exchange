$(document).ready(function () {
  $('#select-currency').material_select();
  $('#button-calc').click(calculateExchange);
  
  loadCurrencyList();
});

function loadCurrencyList() {
  $.ajax({
    url: 'https://kyouko.net/exchange/',
    success: function (data, textStatus, jqXHR) {
      var currencyList = JSON.parse(data);
      currencyList.sort();
      currencyList.forEach(function (currency) {
        $('#group-currencies').append('<option value="' + currency + '">' + currency + '</option>');
      });
      $('#select-currency').material_select();
    }
  });
}

function calculateExchange() {
  if ($('#select-currency').val() != null
    && $('#select-currency').val().length > 0
    && $('#input-amount').val() != null
    && $('#input-amount').val().length > 0) {

    $('#button-calc').addClass('disabled');

    $.ajax({
      url: 'https://kyouko.net/exchange/' + $('#select-currency').val() + '/' + $('#input-amount').val(),
      success: function (data, textStatus, jqXHR) {
        $('#button-calc').removeClass('disabled');

        if (data.toUpperCase() == 'ERROR') {
          $('#input-result').val('0');
        } else {
          $('#input-result').val(data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#button-calc').removeClass('disabled');
      }
    });
  } else {
    $('#input-result').val('0');
  }
}
