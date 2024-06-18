// \components\loading.tsx - Loader bis Seiten geladen sind
export default function Loading() {
    return (
        <div className="loading-screen mt-[10%]">
            <div className="dot bg-green-600"></div>
            <div className="dot bg-red-700"></div>
            <div className="dot bg-yellow-400"></div>
            <div className="dot bg-sky-600"></div>
            <div className="dot bg-purple-900"></div>
            <div className="dot bg-amber-500"></div>
            <div className="dot bg-rose-500"></div>
            <div className="dot bg-cyan-600"></div>
            <style >{`
            .loading-screen {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: auto;
                font-size: 2rem;
            }

            .loading-screen .dot {
                position: relative;
                width: 2rem;
                height: 2rem;
                margin: 0.8em;
                border-radius: 50%;
            }

            .loading-screen .dot::before {
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                background: inherit;
                border-radius: inherit;
                animation: anime 2s ease-out infinite;
            }

            @-webkit-keyframes anime {
                50%,
                75% {
                    transform: scale(2.5);
                }
                80%,
                100% {
                    opacity: 0;
                }
            }

            .loading-screen .dot:nth-child(1)::before {
                animation-delay: 0.2s;
            } 
            .loading-screen .dot:nth-child(2)::before {
                animation-delay: 0.4s;
            } 
            .loading-screen .dot:nth-child(3)::before {
                animation-delay: 0.6s;
            } 
            .loading-screen .dot:nth-child(4)::before {
                animation-delay: 0.8s;
            } 
            .loading-screen .dot:nth-child(5)::before {
                animation-delay: 1s;
            } 
            .loading-screen .dot:nth-child(6)::before {
                animation-delay: 1.2s;
            } 
            .loading-screen .dot:nth-child(7)::before {
                animation-delay: 1.4s;
            } 
            .loading-screen .dot:nth-child(8)::before {
                animation-delay: 1.6s;
            } 
            `}
            </style>
        </div>
    )
}
