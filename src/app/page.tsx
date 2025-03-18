"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [state, setState] = useState<number>(0);

    return (
        <div className={styles.page}>  
            {state}
            <button className="btn btn-primary" onClick={() => setState(state => state += 1)}>
                Increment.
            </button>
        </div>
    );
}
