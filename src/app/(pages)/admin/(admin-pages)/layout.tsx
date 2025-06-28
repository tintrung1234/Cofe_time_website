import SideBar from "../SideBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        < >
            <section className='row d-flex flex-row'>
                <SideBar />
                {children}
            </section>
        </>
    );
}