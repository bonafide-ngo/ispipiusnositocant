// Init
var lib = {};
// Set
lib.regions = {};
lib.themes = {};

/**
 * Get and render the list of regional groups
 */
lib.getRegions = function () {
    $.get('/json/groups.regions.json').done(function (data) {
        // Store namespace
        lib.regions = data;

        // Init
        var template = null;
        // Render list
        $.each(lib.regions, function (index, list) {
            // Clone template
            template = $('[name="template-regions"] .accordion-item').clone();

            // Set header
            template.find('.accordion-header').attr('id', 'groups-regions-header-' + index.toLowerCase());
            // Set button
            template.find('.accordion-button')
                .attr('data-bs-target', '#groups-regions-' + index.toLowerCase())
                .attr('aria-controls', 'groups-regions-' + index.toLowerCase())
                .text(index.replace(/-/g, ' '));
            // Set id
            template.find('.accordion-body').parent()
                .attr('id', 'groups-regions-' + index.toLowerCase())
                .attr('data-bs-parent', '#groups-regions')
                .attr('aria-labelledby', 'groups-regions-header-' + index.toLowerCase());

            var listIndex = 0;
            $.each(list, function (name, url) {
                template.find('.list-group').append(
                    $('<a>', {
                        href: url,
                        target: '_blank',
                        class: 'list-group-item list-group-item-action' + (listIndex++ ? '' : ' bg-light fw-bold'),
                        html: $('<i>', {
                            class: 'fab fa-whatsapp fa-lg pe-1 text-success'
                        })[0].outerHTML + ' ' + name.replace(/-/g, ' ')
                    }))
            });

            // Append 
            $('#groups-regions').append(template);
        });

    }).fail(function () {
        console.error("Cannot fetch list of regional groups");
    });
}

/**
 * Get and render the list of theme groups
 */
lib.getThemes = function () {
    $.get('/json/groups.themes.json').done(function (data) {
        // Store namespace
        lib.themes = data;

        // Init
        var template = null;
        // Render list
        $.each(lib.themes, function (name, url) {
            // Clone template
            template = $('[name="template-themes"] dd').clone();

            // Set link
            template.find('a').attr('href', url).append(name.replace(/-/g, ' '));
            // Set icon
            if (url.search(/t\.me/) != -1)
                template.find('a').addClass('btn-outline-info').find('i').addClass('fa-telegram');
            else if (url.search(/whatsapp\.com/) != -1)
                template.find('a').addClass('btn-outline-success').find('i').addClass('fa-whatsapp');
            else
                template.find('a').addClass('btn-outline-secondary').find('i').addClass('fa-share-alt');

            // Append 
            $('#groups-themes').append(template);
        });

    }).fail(function () {
        console.error("Cannot fetch list of theme groups");
    });


}