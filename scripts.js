document.getElementById('searchInput').addEventListener('input', filterPosts);
document.getElementById('priceFilter').addEventListener('change', filterPosts);

function filterPosts() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var selectedPrice = document.getElementById('priceFilter').value;
    var posts = document.getElementsByClassName('card');

    Array.from(posts).forEach(function (post) {
        var title = post.querySelector('.card-title').textContent.toLowerCase();
        var text = post.querySelector('.card-text').textContent.toLowerCase();
        var price = parseFloat(post.getAttribute('data-price'));

        var matchesSearch = title.includes(input) || text.includes(input);
        var matchesPrice = filterByPrice(price, selectedPrice);

        if (matchesSearch && matchesPrice) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function filterByPrice(price, selectedPrice) {
    if (selectedPrice === 'all') {
        return true;
    }

    var priceRange = selectedPrice.split('-');
    var minPrice = parseFloat(priceRange[0]);
    var maxPrice = parseFloat(priceRange[1]);

    return price >= minPrice && price <= maxPrice;
}

// Initialization for ES Users

