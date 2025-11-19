$(document).ready(function() {
    console.log("Gallery enhancements script loaded: Search, Filter, and Sort ready.");

    const $menuItems = $('.menu-item');
    const $searchInput = $('#search-input');
    const $sortButtons = $('.sort-btn');
    const $pastryMenu = $('#pastry-menu');

    $searchInput.on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase().trim();
        
        $menuItems.each(function() {
            const $item = $(this);
           
            const itemText = $item.find('h3').text().toLowerCase() + " " + $item.find('p').text().toLowerCase();

            if (itemText.includes(searchTerm)) {
                $item.show();
            } else {
                $item.hide();
            }
        });
    });

    $sortButtons.on('click', function() {
        const sortOrder = $(this).data('sort');
        
       
        const itemsArray = $menuItems.get();

       
        itemsArray.sort(function(a, b) {
            const priceA = parseFloat($(a).data('price'));
            const priceB = parseFloat($(b).data('price'));

            if (sortOrder === 'low') {
               
                return priceA - priceB;
            } else {
               
                return priceB - priceA;
            }
        });

        $.each(itemsArray, function(index, item) {
            $pastryMenu.append(item);
        });

        $sortButtons.removeClass('active-sort');
        $(this).addClass('active-sort');
    });

    
    $('#sort-low-high').addClass('active-sort');
});