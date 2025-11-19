$(document).ready(function() {
    console.log("Index enhancements script loaded: Accordion logic active.");
    
    const $accordionHeaders = $('.accordion-header');

    $accordionHeaders.on('click', function() {
        const $header = $(this);
        const $content = $header.next('.accordion-content');
        const isExpanded = $header.attr('aria-expanded') === 'true';


        $accordionHeaders.attr('aria-expanded', 'false');
        $('.accordion-content').slideUp(300);

        if (!isExpanded) {
            $header.attr('aria-expanded', 'true');
            $content.slideDown(300); 
        } else {
            $header.attr('aria-expanded', 'false');
            $content.slideUp(300);
        }
    });

