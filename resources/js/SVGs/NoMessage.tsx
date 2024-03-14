import React from "react";
import {SVGSize} from "@/SVGs/types";

type NoMessageProps = {
    size: SVGSize
}

export default function NoMessage(props: NoMessageProps) {
    return (
        <svg {...props.size} viewBox="0 0 750 750" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="750" height="750" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M722.926 313.351C714.285 377.776 704.531 411.807 647.602 479.276C590.673 546.744 330.161 591.129 233.85 591.129C137.539 591.129 18.8465 516.863 26.3375 430.813C33.8285 344.764 72.9103 274.433 166.454 265.776C262.051 256.928 346.025 297.901 439.879 275.926C521.02 256.928 545.846 184.513 601.576 161.666C714.285 115.461 728.804 269.522 722.926 313.351Z"
                  fill="#1EDB64"/>
            <path
                d="M664.94 344.816C661.756 350.213 621.446 377.524 596.994 381.566C592.263 382.348 587.096 382.617 582.986 380.146C580.558 378.686 578.748 376.41 577.03 374.158C573.1 369.01 569.352 363.723 565.793 358.311C563.923 355.467 562.068 352.499 561.433 349.155C559.75 340.3 566.888 332.347 573.942 326.737C590.157 313.84 609.143 304.444 629.231 299.376C632.787 298.479 636.558 297.719 640.081 298.738C645.799 300.392 649.218 306.178 651.399 311.716C653.581 317.254 655.283 323.312 659.643 327.363C660.639 328.288 668.124 339.419 664.94 344.816Z"
                fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M448.342 580.104C409.22 586.794 427.866 558.361 433.261 522.772C442.126 464.293 453.058 375.425 453.058 375.425C453.058 375.425 460.187 510.839 460.187 543.811C460.187 576.784 453.057 579.298 448.342 580.104Z"
                  fill="white"/>
            <path
                d="M406.541 547.886C407.539 557.303 408.592 566.919 412.594 575.501C410.41 556.067 408.227 536.632 406.044 517.198C405.774 514.798 405.854 511.743 408.062 510.764C409.93 532.709 412.715 554.576 416.408 576.289C416.846 578.867 412.974 580.34 410.8 578.888C408.625 577.436 407.93 574.609 407.435 572.042C403.832 553.331 401.85 534.309 401.521 515.258C396.933 516.161 393.716 520.609 392.788 525.192C391.86 529.774 392.755 534.507 393.648 539.097C396.525 553.87 399.403 568.643 402.28 583.416C403.625 590.326 404.971 597.465 403.486 604.347C397.776 578.276 393.185 551.961 389.731 525.497C345.917 552.289 289.462 557.271 241.633 538.566C231.187 534.481 220.813 529.068 213.913 520.225C208.478 513.258 205.578 504.609 204.058 495.905C198.662 464.992 209.72 433.46 224.729 405.902C230.424 395.445 236.91 384.554 236.45 372.657C236.292 368.56 235.409 364.025 237.801 360.695C238.14 361.312 222.141 246.872 228.559 221.558C244.01 160.617 294.201 152.364 326.337 153.116C347.899 153.62 484.574 180.782 504.32 217.719C530.274 266.264 524.763 307.079 520.154 333.991C518.782 342.005 453.076 374.834 453.058 375C449.302 409.92 424.094 486.011 402.953 514.057C404.149 525.333 405.345 536.61 406.541 547.886Z"
                fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M91.0618 405.798C78.7397 400.879 64.0554 402.337 52.9463 409.584C51.8708 410.286 50.3245 409.504 49.7921 408.336C49.2596 407.169 49.4588 405.811 49.7311 404.558C53.2792 388.23 67.4136 375.737 83.1322 369.996C98.8509 364.254 116.045 364.238 132.754 365.22C134.412 365.317 136.144 365.446 137.559 366.316C138.973 367.185 139.924 369.043 139.22 370.544C132.647 384.541 127.695 399.295 124.496 414.42C123.977 416.872 121.436 418.5 118.933 418.704C116.43 418.909 113.978 417.985 111.706 416.916C104.628 413.584 98.3283 408.698 91.0618 405.798Z"
                  fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M469.808 159.313C470.42 149.947 469.713 140.495 467.717 131.323L467.674 131.128L467.674 131.128C467.335 129.577 466.987 127.982 467.299 126.43C467.99 122.998 471.802 120.931 475.302 121.004C478.803 121.076 482.046 122.747 485.143 124.378C499.999 132.204 515.123 140.228 526.819 152.275C527.186 162.027 524.888 171.652 522.619 181.153L522.405 182.046C512.933 221.757 505.176 261.877 499.164 302.258C498.588 306.128 497.495 310.693 493.825 312.049C491.191 313.021 488.129 311.779 486.259 309.686C484.388 307.593 483.494 304.814 482.87 302.077C481.331 295.325 481.146 288.267 482.328 281.443C483.052 277.27 484.274 273.211 485.497 269.151L485.497 269.15L485.497 269.15L485.497 269.149L485.498 269.149L485.498 269.149L485.498 269.148L485.498 269.148C486.596 265.504 487.694 261.858 488.431 258.129C489.168 254.399 489.54 250.608 489.9 246.823C491.817 226.696 493.444 206.541 494.778 186.367C494.967 183.516 495.139 180.576 494.205 177.876C492.544 173.073 487.706 170.038 482.818 168.646C481.976 168.406 481.12 168.202 480.265 167.998C478.274 167.524 476.284 167.049 474.467 166.124C471.87 164.801 469.618 162.221 469.808 159.313ZM478.885 158.543C485.793 160.001 492.544 162.202 498.984 165.097C500.281 165.679 501.644 166.362 502.345 167.599C502.917 168.609 502.95 169.826 502.967 170.987C503.169 184.622 503.212 198.293 501.768 211.854C500.904 219.973 499.509 228.022 498.114 236.071C497.673 238.618 497.232 241.166 496.807 243.715C494.706 256.331 493.015 269.016 491.737 281.742C490.81 290.976 490.132 300.519 493.004 309.344C494.478 309.074 495.045 307.3 495.324 305.828L521.868 165.92C522.511 162.53 523.153 159.026 522.395 155.66C521.069 149.767 515.838 145.669 510.795 142.344C501.087 135.944 490.753 130.492 479.988 126.093C479.093 136.883 478.725 147.717 478.885 158.543ZM492.535 250.428C497.395 225.477 499.59 200.009 499.072 174.594C499.033 172.675 498.93 170.612 497.756 169.093C496.896 167.98 495.581 167.328 494.297 166.753C489.476 164.593 484.407 162.986 479.221 161.973C477.72 161.68 475.514 161.997 475.58 163.525L494.218 171.227C495.311 171.679 496.475 172.19 497.093 173.198C497.699 174.188 497.64 175.431 497.561 176.588L492.535 250.428ZM475.191 123.625C473.655 122.607 471.435 123.657 470.579 125.29C469.723 126.922 469.853 128.877 470.047 130.71C470.332 133.4 470.707 136.091 471.081 138.782C472.121 146.25 473.161 153.72 472.277 161.172C473.687 161.655 475.26 160.662 475.944 159.338C476.628 158.014 476.646 156.458 476.648 154.968L476.695 128.096C476.698 126.454 476.56 124.533 475.191 123.625ZM488.992 308.737C488.145 302.097 487.924 295.376 488.33 288.694C488.548 285.121 488.944 281.561 489.341 278.001L489.341 278.001C489.865 273.293 490.389 268.587 490.499 263.854C486.628 275.375 485.166 287.7 486.235 299.808C486.513 302.957 487.028 306.259 488.992 308.737ZM491.122 257.048C491.745 256.769 492.006 255.894 491.639 255.319C491.007 255.63 490.738 256.513 491.09 257.125L491.122 257.048ZM485.334 199.344C454.528 180.345 419.695 168.963 384.86 159.141C373.724 156.001 362.495 152.992 350.997 151.704C316.929 147.887 282.391 159.642 254.063 178.949C242.702 186.692 231.74 196.217 226.832 209.06C223.19 218.589 223.215 229.079 223.566 239.274C224.777 274.436 229.289 309.391 233.796 344.283C237.319 343.648 237.667 338.775 237.157 335.231C232.471 302.691 229.843 269.855 229.296 236.984C229.142 227.766 229.19 218.316 232.38 209.667C238.154 194.01 253.047 183.77 267.661 175.712C286.067 165.562 306.075 157.03 327.089 156.577C352.544 156.029 376.671 167.32 398.908 179.721C411.305 186.634 423.874 194.354 431.761 206.156C438.922 216.872 441.523 229.932 443.402 242.683C449.366 283.153 449.585 324.222 449.791 365.128C449.8 366.783 449.699 368.679 448.402 369.708C447.516 370.411 446.306 370.499 445.176 370.558L403.647 372.719C422.999 378.283 444.466 376.089 462.291 366.724L508.434 342.484C512.741 340.221 517.186 337.845 520.154 333.991C524.24 328.687 524.824 321.551 525.017 314.859C525.729 290.142 523.258 265.336 517.683 241.245C519.615 267.305 519.883 293.488 518.485 319.582C518.246 324.038 517.889 328.714 515.466 332.461C512.877 336.463 508.378 338.73 504.091 340.814L454.293 365.017C456.354 326.325 454.755 287.439 449.526 249.046C447.767 236.134 445.523 223.04 439.613 211.425C425.648 183.975 394.738 170.396 366.17 158.89C408.881 171.386 452.079 184.088 490.504 206.536C491.003 203.435 488.008 200.993 485.334 199.344ZM644.48 317.453C646.694 323.159 649.807 329.242 655.528 331.417C656.884 331.521 657.693 329.724 657.249 328.44C656.877 327.367 656.003 326.585 655.145 325.818C655.083 325.762 655.021 325.707 654.959 325.651L654.864 325.565L654.788 325.496L654.741 325.453C654.708 325.423 654.676 325.393 654.643 325.363C651.003 321.981 649.216 317.2 647.455 312.49L647.454 312.487C647.106 311.557 646.759 310.629 646.4 309.716C644.218 304.178 640.799 298.392 635.081 296.738C631.558 295.719 627.788 296.479 624.232 297.376C604.143 302.444 585.157 311.84 568.942 324.737C561.888 330.347 554.751 338.3 556.433 347.155C557.068 350.499 558.923 353.467 560.793 356.311C564.352 361.723 568.1 367.01 572.03 372.158C573.749 374.41 575.558 376.686 577.986 378.146C582.096 380.617 587.263 380.348 591.994 379.566C616.446 375.524 637.374 360.328 657.288 345.575C658.325 344.807 659.403 343.989 659.94 342.816C660.477 341.643 660.248 340.012 659.109 339.407C657.803 338.713 656.263 339.671 655.099 340.582C636.567 355.091 616.772 369.269 593.795 374.366C589.439 375.332 584.638 375.901 580.719 373.768C577.787 372.173 575.806 369.304 573.937 366.538L562.346 349.387C561.369 347.942 560.357 346.39 560.321 344.647C560.285 342.903 561.694 341.018 563.423 341.243C579.67 343.356 595.995 344.875 612.354 345.796C613.657 345.869 615.019 345.928 616.205 345.386C617.734 344.688 618.665 343.142 619.481 341.673C626.406 329.188 631.696 315.797 635.173 301.95C639.796 305.264 641.953 310.879 644.011 316.236L644.013 316.24C644.169 316.646 644.324 317.051 644.48 317.453ZM630.18 300.854C627.085 312.435 622.505 323.618 616.59 334.043C615.598 335.791 614.497 337.591 612.763 338.606C610.556 339.898 607.811 339.654 605.27 339.371L564.798 334.855C571.513 325.981 581.488 320.223 591.455 315.275C600.889 310.591 610.575 306.413 620.456 302.764C623.584 301.609 626.865 300.49 630.18 300.854ZM406.541 547.886C407.539 557.303 408.592 566.919 412.594 575.501L406.044 517.198C405.774 514.798 405.854 511.743 408.062 510.764C409.93 532.709 412.715 554.576 416.408 576.289C416.846 578.867 412.974 580.34 410.8 578.888C408.625 577.436 407.93 574.609 407.435 572.042C403.832 553.331 401.85 534.309 401.521 515.258C396.933 516.161 393.716 520.609 392.788 525.192C391.86 529.774 392.755 534.507 393.648 539.097L402.28 583.416C403.625 590.326 404.971 597.465 403.486 604.347C397.776 578.276 393.185 551.961 389.731 525.497C345.917 552.289 289.462 557.271 241.633 538.566C231.187 534.481 220.813 529.068 213.913 520.225C208.478 513.258 205.578 504.609 204.058 495.905C198.662 464.992 209.72 433.46 224.729 405.902C225.12 405.184 225.515 404.464 225.911 403.742C231.282 393.945 236.878 383.738 236.45 372.657C236.422 371.924 236.371 371.178 236.319 370.427C236.081 366.977 235.836 363.43 237.801 360.695C240.436 365.489 241.439 371.161 240.609 376.568C285.968 374.615 331.394 374.222 376.78 375.389C377.31 377.476 374.286 378.445 372.134 378.413C329.779 377.781 287.404 378.503 245.095 380.576C243.755 380.642 242.348 380.729 241.212 381.442C240.017 382.193 239.321 383.51 238.679 384.766C226.671 408.261 214.624 432.098 208.82 457.837C205.835 471.074 204.692 485.561 210.809 497.672C213.13 502.267 216.412 506.325 220.077 509.939C239.751 529.345 269.213 535.295 296.843 534.831C314.478 534.534 332.074 531.999 349.075 527.306C367.099 522.33 385.074 514.486 397.377 500.406C404.601 492.137 409.512 482.123 413.812 472.02C422.023 452.729 428.321 432.624 432.584 412.096C435.253 412.657 435.29 416.432 434.674 419.089C427.054 451.965 418.196 487.007 393.096 509.566C370.426 529.94 338.481 536.258 308.049 537.963C290.47 538.947 272.614 538.639 255.588 534.158C238.561 529.677 222.303 520.712 211.494 506.815C214.647 518.835 225.326 527.414 236.444 532.966C265.636 547.543 300.107 546.772 332.34 541.705C353.812 538.33 375.851 532.791 392.561 518.891C406.844 507.01 415.947 490.041 422.799 472.772C430.383 453.656 435.644 433.62 438.429 413.245C440.164 412.148 441.449 415.214 441.229 417.254C437.473 452.174 424.094 486.011 402.953 514.057L406.541 547.886ZM386.24 607.601C384.377 604.455 383.178 600.919 382.743 597.29L380.067 606.359L373.314 580.602C372.79 578.604 371.515 576.103 369.494 576.533C367.53 576.95 367.309 579.646 367.602 581.632C369.073 591.624 371.879 601.419 375.922 610.674L368.74 604.372C368.391 607.372 369.18 610.492 370.915 612.964C367.175 610.209 362.157 609.27 357.673 610.486C360.877 614.938 365.227 618.558 370.188 620.899L364.119 612.428C369.024 615.26 374.164 617.686 379.467 619.675L374.325 613.227L380.679 614.988C375.817 603.928 370.865 592.446 370.982 580.365C372.822 590.193 375.516 599.861 379.023 609.224C379.618 610.81 380.278 612.451 381.544 613.577C382.81 614.703 384.868 615.127 386.194 614.073C387.225 613.253 387.526 611.84 387.76 610.544L390.622 594.674L393.765 614.355C396.148 608.335 403.898 606.827 410.372 606.786C418.921 606.733 427.533 607.675 436.123 608.614H436.123H436.124H436.124H436.124H436.124H436.125H436.125H436.125C451.611 610.308 467.024 611.993 481.861 607.828C481.426 610.122 480.663 612.353 479.605 614.435C491.577 612.692 503.692 611.927 515.789 612.15C520.897 612.244 526.021 612.513 531.145 612.782H531.146H531.146H531.147H531.147H531.148H531.148H531.149H531.149C544.695 613.493 558.242 614.204 571.515 611.689L483.425 610.915C485.08 610.819 486.347 608.895 485.784 607.337C485.22 605.778 483.015 605.111 481.682 606.096C480.815 603.342 476.921 602.117 474.634 603.88C475.96 599.792 478.582 596.135 482.028 593.568C478.138 593.359 474.188 594.55 471.062 596.873L480.537 553.022C479.736 552.332 478.4 552.796 477.808 553.671C477.222 554.538 477.157 555.64 477.095 556.686L477.093 556.718C476.206 571.692 470.925 586.379 462.075 598.49L458.6 588.436L453.619 600.446C451.362 598.697 448.16 598.256 445.514 599.329C446.189 601.897 448.244 604.058 450.774 604.862L451.953 601.704L459.734 606.916C456.76 603.799 456.116 598.701 458.221 594.942L462.93 602.84L472.057 584.789C472.108 592.037 469.002 598.887 465.957 605.465C469.266 602.873 472.111 599.69 474.316 596.111C476.444 599.879 474.12 604.933 470.418 607.176C466.717 609.42 462.139 609.542 457.815 609.359C451.217 609.08 444.569 608.251 437.929 607.424L437.928 607.423C423.017 605.565 408.146 603.711 393.981 608.101L391.939 589.268C388.818 594.906 386.866 601.187 386.24 607.601ZM475.114 608.103C474.794 607.721 474.796 607.107 475.118 606.727L475.376 606.824C475.808 605.788 477.628 605.873 477.962 606.944C477.123 607.55 476.137 607.951 475.114 608.103ZM523.24 408.002C512.981 402.817 500.772 404.216 489.384 405.777C486.166 406.218 482.885 406.681 479.97 408.114C477.055 409.547 474.517 412.142 474.014 415.35C446.201 411.878 419.547 399.635 398.791 380.799C394.286 376.71 389.689 370.889 391.715 365.153C392.352 363.35 393.591 361.828 394.88 360.416C404.557 349.806 417.899 343.425 430.888 337.3C416.167 338.591 402.042 345.751 392.299 356.861C390.066 359.408 388.007 362.252 387.238 365.551C385.34 373.695 391.665 381.335 397.996 386.798C418.195 404.232 443.602 415.553 470.072 418.915C471.659 419.117 471.741 421.348 471.596 422.942C470.951 430.03 474.815 436.947 480.17 441.635C485.525 446.323 492.232 449.139 498.888 451.66C519.5 459.467 540.891 465.217 562.64 468.797C564.076 469.033 566.05 468.921 566.353 467.497C561.334 464.177 555.293 462.912 549.387 461.675L549.365 461.671L549.299 461.657L548.791 461.55L548.431 461.475C533.455 458.322 518.681 454.216 504.226 449.19C498.296 447.127 492.352 444.876 487.182 441.314C482.011 437.753 477.62 432.722 475.967 426.665C475.15 423.675 476.258 419.21 479.335 419.586C491.866 421.119 504.74 422.632 516.975 419.524C519.744 418.82 522.631 417.76 524.318 415.455C526.006 413.15 525.79 409.291 523.24 408.002ZM491.634 416.282C487.333 415.542 482.939 415.344 478.588 415.694C480.702 411.678 485.866 410.621 490.362 410.009C500.134 408.678 510.311 407.381 519.675 410.479C520.293 410.684 520.953 410.945 521.288 411.504C521.728 412.24 521.407 413.242 520.781 413.828C520.155 414.414 519.302 414.681 518.476 414.911C509.777 417.343 500.536 417.815 491.634 416.282ZM349.302 618.858C356.5 618.657 363.742 620.248 370.193 623.449C368.468 625.927 365.003 626.274 361.986 626.389L283.136 629.381C282.413 629.291 282.277 628.175 282.789 627.658C283.301 627.14 284.101 627.073 284.829 627.038L361.801 623.284C357.354 622.876 353.015 621.339 349.302 618.858ZM197.558 358.085C196.434 363.458 200.98 369.192 206.455 369.598C197.502 383.091 181.375 389.749 165.88 394.45C156.209 397.383 145.481 399.792 136.262 395.653C135.117 396.352 136.338 398.073 137.546 398.656C146.518 402.979 157.155 400.57 166.698 397.722C180.694 393.545 195.12 388.147 204.643 377.073C205.033 376.62 205.421 376.153 205.812 375.683L205.813 375.683L205.813 375.682C208.264 372.737 210.82 369.665 214.505 368.983C226.37 366.789 236.252 359.357 246.016 352.014L246.017 352.014L246.018 352.013L246.018 352.013L246.019 352.013C248.233 350.348 250.441 348.687 252.664 347.093C266.184 337.404 281.179 329.776 296.972 324.555C298.366 324.094 300.063 323.238 299.939 321.775C280.358 323.572 263.244 335.248 247.462 346.977L246.936 347.368C236.211 355.342 225.003 363.674 211.806 365.65C216.117 362.25 215.207 354.394 210.344 351.847C205.48 349.3 198.681 352.711 197.558 358.085ZM201.212 361.368C200.331 358.762 201.69 355.661 204.104 354.34C204.789 353.965 205.556 353.716 206.337 353.715C208.915 353.712 210.797 356.47 210.814 359.048C210.831 361.625 209.524 364.003 208.254 366.246C205.283 365.791 202.173 364.216 201.212 361.368ZM494.203 303.927C493.473 303.114 493.698 302.02 493.93 300.886C494.094 300.085 494.262 299.264 494.101 298.509C493.961 297.855 493.579 297.298 493.196 296.738C492.857 296.244 492.518 295.748 492.343 295.182C492.383 294.434 493.383 294.05 494.065 294.36C494.747 294.671 495.128 295.403 495.366 296.113C496.235 298.705 495.789 301.7 494.203 303.927ZM428.197 247.053C430.021 242.727 433.638 238.891 438.25 238.013C439.742 237.729 439.696 235.269 438.388 234.495C437.08 233.722 435.401 234.179 434.029 234.832C427.64 237.873 423.606 244.568 422.025 251.465C420.445 258.362 420.968 265.546 421.499 272.602L424.324 310.108C424.42 311.384 424.537 312.723 425.247 313.786C426.693 315.953 429.795 316.021 432.395 315.855L445.553 315.02C442.628 312.728 438.703 311.763 435.05 312.438C432.916 312.832 430.773 311.425 429.643 309.573C428.512 307.721 428.181 305.505 427.901 303.353C426.067 289.277 425.394 275.05 425.891 260.864C426.056 256.172 426.372 251.378 428.197 247.053ZM461.793 579.971C461.046 580.513 460.297 579.279 460.188 578.362C455.103 535.619 454.336 492.495 453.575 449.458L453.062 420.444C453.047 419.618 453.059 418.712 453.59 418.079C454.504 416.989 456.428 417.489 457.226 418.666C458.025 419.844 458.026 421.369 458 422.792C457.216 465.143 457.731 507.576 461.786 549.74C461.835 550.252 461.885 550.766 461.935 551.279V551.28C462.864 560.858 463.808 570.58 461.793 579.971ZM419.518 310.547C418.405 309.936 417.031 310.282 415.812 310.642C359.44 327.315 303.196 344.507 247.782 364.129C246.744 364.496 245.558 365.025 245.32 366.099C245.068 367.237 246.139 368.324 247.285 368.535C248.431 368.746 249.591 368.336 250.684 367.934C306.219 347.504 362.59 329.347 419.608 313.523C420.832 313.183 420.632 311.159 419.518 310.547Z"
                  fill="#00160A"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M620.366 565.587C619.054 566.164 617.633 566.701 616.22 566.458C614.807 566.215 613.486 564.888 613.769 563.483C616.364 550.636 613.106 536.724 605.078 526.364C602.264 522.734 598.915 519.539 596.173 515.853C594.445 513.531 592.909 510.611 593.785 507.852C595.031 503.927 600.052 502.972 604.161 502.692C613.714 502.041 623.266 501.39 632.818 500.739C637.22 500.439 642.289 500.394 645.227 503.685C653.406 512.846 669.347 513.462 678.208 504.958C679.579 503.642 681.306 506.262 681.251 508.161C681.08 514.134 678.618 520.013 674.483 524.326C673.507 525.343 672.259 526.34 670.857 526.194C669.455 526.048 668.42 524.035 669.538 523.176C671.937 521.334 674.38 519.445 676.061 516.931C677.743 514.417 678.559 511.122 677.412 508.323C671.241 516.129 665.012 523.889 658.724 531.601C647.822 544.972 636.162 558.649 620.366 565.587ZM637.596 526.241C636.027 526.675 634.353 526.341 632.786 525.899C621.512 522.713 611.125 513.904 599.592 515.966C613.039 526.796 620.179 544.955 617.709 562.044C626.569 560.147 633.566 553.532 639.842 546.996C649.13 537.321 657.95 527.196 666.259 516.668C660.287 516.619 654.337 514.897 649.262 511.747C642.993 513.298 643.821 524.519 637.596 526.241ZM645.784 508.453C642.049 504.05 635.337 504.186 629.585 504.692C622.084 505.35 614.582 506.009 607.08 506.668C604.034 506.936 600.536 507.47 598.948 510.083C611.932 512.801 624.591 517.071 636.569 522.772C638.11 517.933 641.198 513.599 645.269 510.563C645.726 510.222 646.25 509.783 646.19 509.216C646.158 508.925 645.973 508.676 645.784 508.453V508.453Z"
                  fill="#CC1EDB"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M89.6082 403.457C78.309 398.939 64.8437 400.279 54.6567 406.936C53.6704 407.58 52.2525 406.862 51.7643 405.79C51.2761 404.718 51.4587 403.47 51.7084 402.319C54.962 387.319 67.923 375.842 82.3369 370.568C96.7508 365.293 112.517 365.278 127.839 366.18C129.359 366.27 130.949 366.388 132.245 367.187C133.542 367.985 134.415 369.693 133.768 371.072C127.741 383.93 123.201 397.484 120.267 411.378C119.791 413.632 117.461 415.126 115.166 415.314C112.871 415.502 110.622 414.654 108.539 413.672C102.048 410.611 96.2715 406.122 89.6082 403.457ZM90.8999 388.28C89.8928 389.098 88.3188 388.666 87.3713 387.78C86.4237 386.893 85.8838 385.667 85.139 384.604C81.1438 378.905 71.9758 379.378 66.5414 383.727C61.107 388.075 58.4773 394.945 56.0827 401.48C72.0258 394.555 91.6625 397.04 105.378 407.719C107.25 409.177 109.109 410.82 111.414 411.381C113.72 411.942 116.625 410.934 117.209 408.633C120.33 396.345 124.175 384.24 128.718 372.404C120.001 383.239 101.693 379.511 90.8999 388.28ZM87.4306 381.732C88.326 382.857 89.9514 383.155 91.3665 382.901C92.7816 382.647 94.0671 381.943 95.3856 381.37C99.925 379.396 104.953 378.956 109.819 378.054C114.686 377.152 119.706 375.625 123.132 372.052C115.402 372.029 107.672 372.006 99.9421 371.983C92.1739 371.959 83.8027 372.124 77.562 376.75C81.3611 376.889 85.0632 378.758 87.4306 381.732Z"
                  fill="#CC1EDB"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M452.627 402.421C452.609 395.622 452.591 388.823 452.572 382.024C452.567 380.071 452.562 378.118 452.557 376.166C452.553 374.819 452.779 373.135 454.059 372.716C455.026 372.399 456.092 373.095 456.544 374.007C456.997 374.919 456.992 375.982 456.976 377.001C456.835 386.489 456.694 395.977 456.553 405.466C456.532 406.83 456.304 408.509 455.026 408.988C452.895 407.781 452.634 404.87 452.627 402.421H452.627Z"
                  fill="#00160A"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M439.053 396.129C438.069 396.56 437.561 394.939 437.713 393.875C438.257 390.067 438.803 386.252 439.729 382.519C440.306 380.195 441.137 377.75 443.056 376.318C444.976 374.887 448.272 375.138 449.211 377.34C449.666 378.407 449.477 379.626 449.268 380.767C447.975 387.83 446.235 394.812 444.06 401.655C443.968 401.945 443.867 402.248 443.647 402.459C443.112 402.972 442.146 402.627 441.775 401.985C441.405 401.343 441.453 400.551 441.512 399.812C442.396 399.748 442.808 398.708 443.02 397.848C443.887 394.334 444.754 390.82 445.62 387.307C446.295 384.572 446.91 381.459 445.341 379.121C443.728 380.113 443.123 382.122 442.643 383.953C441.677 387.638 440.712 391.323 439.747 395.008C439.631 395.449 439.47 395.946 439.053 396.129L439.053 396.129Z"
                  fill="#00160A"/>
        </svg>
    )
}
