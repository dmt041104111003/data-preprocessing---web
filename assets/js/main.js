(() => { const t = document.querySelector('.mobile-nav-toggle'),
        m = 'mobile-nav-active',
        x = 'bi-list',
        y = 'bi-x',
        c = 'classList',
        toggle = () => { document.body[c].toggle(m);
            t[c].toggle(x);
            t[c].toggle(y); };
    t.addEventListener('click', toggle);
    document.querySelectorAll('#navmenu a').forEach(n => n.addEventListener('click', () => document.body[c].contains(m) && toggle()));
    document.querySelectorAll('.navmenu .has-dropdown i').forEach(i => i.addEventListener('click', e => { e.preventDefault(); const p = i.parentNode;
        p[c].toggle('active');
        p.nextElementSibling[c].toggle('dropdown-active');
        e.stopPropagation(); })); })();