/**
 * Created by tim on 17-8-14.
 */
$(function () {
    var td = '';
    var tr = [];
    var trStr = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i][0]) {
            for (let j = 0; j < 4; j++) {
                if (typeof data[i][j] == 'undefined') {
                    data[i][j] = '';
                }

                td += ('<td>' + Math.round(data[i][j]) + '</td>');

            }
            tr[i] += ('<tr>' + td + '<td><button class="btn btn-default edit">edit</button> <button class="btn btn-danger del">Del</button></td></tr>');
        }
        td = '';
    }

    for (var key in tr) {
        trStr += tr[key];
    }

    $('tbody').html(trStr);

});
