$("#shippingZipCodedefault").on("change", function () {
    var URL = $("#url-to-controller-custom-anchor").data().url;
    URL +=
        "?zip=" +
        $(this).val() +
        "&fname=" + $("#shippingFirstNamedefault").val() +
        "&lname=" + $("#shippingLastNamedefault").val() + 
        "&address1=" + $("#shippingAddressOnedefault").val() +
        "&address2=" + $("#shippingAddressTwodefault").val() +
        "&country=" + $("#shippingCountrydefault").val() +
        "&state=" + $("#shippingStatedefault").val() +
        "&city=" + $("#shippingAddressCitydefault").val() +
        "&phone=" + $("#shippingPhoneNumberdefault").val();

    $.ajax({
        url: URL,
        method: "POST",
        success: function (res) {
            if (res.error) {
            } else {
                console.log(res);
                $('.custom-shipping-method-ns-shipEngine').html('Shipping Tax ---------------- ' + res.shippingRate)
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
});
