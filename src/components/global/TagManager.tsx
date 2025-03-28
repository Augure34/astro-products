export default function TagManager() {
    return (
        <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-3M0ZDWDTJC"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-3M0ZDWDTJC');
            </script>
        </>
    )
}