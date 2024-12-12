import Image from "next/image";

export default function Partners() {
  return (
    <div className="partners">
      <ol>
        <li>
          <h2>Main Sponsor</h2>
          <ul>
            <li>
              <Image
                src="/img/partners/samansa.png"
                alt="logo"
                width={200}
                height={100}
                style={{
                  objectFit: "contain",
                  margin: "0 0.5rem",
                }}
              />
            </li>
          </ul>
        </li>
        <li>
          <h2>Gold Sponsor</h2>
          <ul>
            <li>
              <Image
                src="/img/partners/bdns.png"
                alt="logo"
                width={100}
                height={100}
                style={{
                  objectFit: "contain",
                  margin: "0 0.5rem",
                }}
              />
              <span>김용화</span>
            </li>
          </ul>
        </li>
        <li>
          <h2>Silver Sponsor</h2>
          <ul>
            <li>
              <Image
                src="/img/partners/keds.png"
                alt="logo"
                width={100}
                height={100}
                style={{
                  objectFit: "contain",
                  filter: "brightness(200%)",
                  margin: "0 0.5rem",
                }}
              />
            </li>
          </ul>
        </li>
        <li>
          <h2>Bronze Sponsor</h2>
          <ul>
            <li>
              <Image
                src="/img/partners/b.png"
                alt="logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "0 0.5rem", width: "100%" }}
              />
            </li>
          </ul>
        </li>
        <li>
          <h2>Friend Partner</h2>
          <ul>
          <Image
                src="/img/partners/f.png"
                alt="logo"
                width={50}
                height={50}
                style={{ objectFit: "contain", margin: "0 0.5rem", width: "100%" }}
              />
          </ul>
        </li>
        <li>
          <h2>Supporting Partner</h2>
          <ul>
            <li>
            <Image
                src="/img/partners/s1.png"
                alt="logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "0 0.5rem", width: "100%" }}
              />
              <Image
                src="/img/partners/s2.png"
                alt="logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "0 0.5rem", width: "100%" }}
              />
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
