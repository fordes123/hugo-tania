export function initTocObserver(): void {
    const options: IntersectionObserverInit = {
        threshold: 0.5,
        rootMargin: '0px 0px -40% 0px'
    };

    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (!entry.target.id) return;
            
            const item: HTMLElement | null = document.querySelector(`li a[href="#${entry.target.id}"]`);
            if (!item) return;

            if (entry.isIntersecting) {
                document.querySelectorAll('.active').forEach((el: Element) => el.classList.remove('active'));
                item.parentElement?.classList.add('active');
                
                const rect = item.getBoundingClientRect();
                const isInView = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );
            
                if (!isInView) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }, options);

    const elements: NodeListOf<Element> = document.querySelectorAll('.article-post [id]');
    elements.forEach((element: Element) => {
        observer.observe(element);
    });

    window.addEventListener('unload', () => {
        observer.disconnect();
    });
}