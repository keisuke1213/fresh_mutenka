'use client'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from "./header.module.css";

export default function Header() {
    const pathname = usePathname();
    return (
            <header className={styles.header}>
                
                    <ul className={styles.ul}>
                        <li>
                            <Link className={styles.home} href="/home">
                                <img src="/vector.png" width="30" height="30"/>
                            </Link>
                            <Link className={styles.list} href="/list">
                                <img src="/person.png" width="30" height="30"/>
                            </Link>
                            <Link className={styles.setting} href="">
                                <img src="/setting.png" width="30" height="30"/>
                            </Link>
                        </li>
                    </ul>
                    <h1 className={styles.h1}>{pathname.replace(/^\//, '')}</h1>
                    <h1 className={styles.h1}>EXPOSURE</h1>

                
            </header>
    )
}