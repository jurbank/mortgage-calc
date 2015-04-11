var sliderAmount = $('.slider-amount');
var sliderIntrest = $('.slider-intrest');
var sliderTerm = $('.slider-term');

var inputAmount = $('.input-amount'), guard = false;
var inputIntrest = $('.input-intrest'), guard = false;
var inputTerm = $('.input-term'), guard = false;

function setSalesValue(value){
    if ( guard ) return;
    $(this).val(value);
}

sliderAmount.noUiSlider({
    start: [ 90000 ],
    range: {
    'min': [ 0, 1000 ],
    // '33%': [ 1000, 1000 ],
    // '66%': [ 5000, 1000 ],
    'max': [ 1000000, 1000 ]
		},
    format: wNumb({
        decimals: 0,
        mark: '.',
        thousand: ',',
        prefix: '$'
    })     
});

sliderIntrest.noUiSlider({
    start: [ 2 ],
    range: {
    'min': [ 0 ],
    // '33%': [ 1000, 1000 ],
    // '66%': [ 5000, 1000 ],
    'max': [ 20, 1000 ]
		},
    format: wNumb({
        decimals: 2,
        mark: '.',
        thousand: ',',
        postfix: '%'
    })     
});

sliderTerm.noUiSlider({
    start: [ 10 ],
    range: {
    'min': [ 10, 10 ],
    '33%': [ 15, 10 ],
    '66%': [ 20, 10 ],
    // '50%': [20, 10],
    'max': 30
		},
    format: wNumb({
        // decimals: 2,
        // mark: '.',
        thousand: ',',
        postfix: ' Years'
    })
});

// sliderAmount.noUiSlider_pips({
//     mode: 'positions',
//     values: [0,33,66,100],
//     density: 4,
//     stepped: true
// });

$('.slider-amount').Link("lower").to(inputAmount, setSalesValue);
$('.slider-intrest').Link("lower").to(inputIntrest, setSalesValue);
$('.slider-term').Link("lower").to(inputTerm, setSalesValue);

inputAmount.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});

inputIntrest.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});

inputTerm.change(function(){
    var value = $(this).val();
    guard = true;
    sliderAmount.val(value);
    guard = false;
});



// UNFORMAT FOR USAGE
unFormatAmount = wNumb({
  decimals: 0,
  mark: '.',
  thousand: ',',
  prefix: '$'
});

unFormatIntrest = wNumb({
  decimals: 2,
  mark: '.',
  thousand: ',',
  postfix: '%'
});

unFormatTerm = wNumb({
    thousand: ',',
    postfix: ' Years'
});

console.log(unFormatAmount.from( sliderAmount.val() ));
console.log(unFormatAmount.from( sliderIntrest.val() ));
console.log(unFormatAmount.from( sliderTerm.val() ));
