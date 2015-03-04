(function () {
  'use strict';
  
  var amount_to_collect = 500;
  var current_money = 0;
  var plot;

  function getTotal(callback) {
    $.getJSON('/total', function (res) {
      $('#total-users').text(res.users);
      $('#avg-payment').text(res.avg);

      var money = res.total;
      if (money != current_money) {
        current_money = money;
        var missing = amount_to_collect - money;
        var data = [{ label: "Rahaa kasassa", data: money },{ label: "Rahaa puuttuu", data: missing }];
        callback(data);
      }
    })
  }
  
  function labelFormatter(label, series) {
    return "<div style='font-size:12pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" +series.data[0][1] + "€</div>";
  }

  $('#amount-to-pay').keyup(function () {
    var value = $('#amount-to-pay').val();
    $.post('/value', { amount : value });
  });
  
  getTotal(function (data) {
    plot = $.plot('#graph-container-element', data, {
      series: {
        pie: {
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 3 / 4,
            formatter: labelFormatter,
            background: {
              opacity: 0.5
            }
          }
        }
      },
      legend: {
        show: false
      }
    });
  });

  setInterval(function () {
    getTotal(function(data){
      plot.setData(data);
      plot.draw();
    });
  }, 1000);

})();