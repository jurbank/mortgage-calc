var sliderAmount = $('.slider-amount');
var inputAmount = $('.input-amount'), guard = false;

function setSalesValue(value){
    if ( guard ) return;
    $(this).val(value);
}

sliderAmount.noUiSlider({
    start: [ 0 ],
    range: {
    'min': [ 0, 1000 ],
    // '33%': [ 1000, 1000 ],
    // '66%': [ 5000, 1000 ],
    'max': [ 10000000, 1000 ]
		},
    format: wNumb({
        decimals: 0,
        mark: '.',
        thousand: ',',
        prefix: '$'
    })     
});

// sliderAmount.noUiSlider_pips({
//     mode: 'positions',
//     values: [0,33,66,100],
//     density: 4,
//     stepped: true
// });

$('.slider-amount').Link("lower").to(inputAmount, setSalesValue);

inputAmount.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});