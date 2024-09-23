import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit a laboriosam excepturi neque soluta pariatur, similique voluptatum, alias deserunt veritatis eaque quaerat corporis. Dolore, expedita nam illum animi incidunt et deleniti cumque nihil voluptatum exercitationem quam quae hic veniam doloremque repudiandae, architecto atque culpa. Sapiente, unde sequi suscipit eaque cupiditate totam. Quo cupiditate laudantium unde placeat aliquam pariatur iste minus at illum molestiae necessitatibus sunt odit nemo quas laborum, aliquid a aperiam tempore officia tempora est id. Libero aut facere itaque omnis laborum quas, accusamus corrupti a explicabo, nam aliquam nisi. Dignissimos hic dolor atque iusto veritatis dolorum tempore fugiat at, nesciunt aliquam nemo harum animi sit autem. Ipsum hic dolorum, itaque iusto nostrum, deleniti distinctio id commodi modi saepe amet animi earum dicta. Nostrum facere impedit recusandae laborum voluptas voluptatibus, architecto eos officia optio asperiores. Atque, recusandae? Provident ipsa doloremque placeat illo optio quasi exercitationem ducimus! Laudantium consectetur delectus non quod repellat alias exercitationem culpa rem laboriosam, vitae illo fugit temporibus ullam enim eos hic architecto, dolores porro. Quibusdam ex autem cumque, odio deleniti dignissimos praesentium provident non quia cupiditate sit debitis eum cum fugit nulla eveniet nesciunt perspiciatis pariatur placeat, itaque nihil, necessitatibus dolor maxime? Quidem debitis numquam veniam eligendi reprehenderit, distinctio necessitatibus, quasi ea, natus dignissimos accusamus quia. Est, qui cumque deserunt quaerat quibusdam ducimus, suscipit, sint voluptate ad repellendus ipsam repellat aperiam fugiat? Ducimus dolor suscipit similique sint? Quidem dolore eligendi quasi illum mollitia minima laudantium, quas culpa maiores dignissimos officia adipisci non repellendus recusandae dolorum, placeat, sunt praesentium est iure odit quisquam rem totam! Ab harum vero ipsa incidunt cum, omnis voluptatum sit! Dolore corrupti illum, aut nulla dignissimos nam earum optio quas iusto quia impedit ullam eum reprehenderit assumenda facilis? Ab facilis sit rerum, possimus ullam excepturi hic asperiores omnis accusamus deserunt tempora dolor numquam eos voluptas sed aliquam voluptatibus nulla ipsa vitae nesciunt maiores iusto quo! Mollitia voluptate itaque esse. Tenetur perferendis doloremque earum nostrum eum ut adipisci id, illo laboriosam cupiditate consequuntur doloribus iure tempora repellat cumque! Vero iusto eaque eveniet dolorem dolore laboriosam amet, quae aliquam architecto perferendis consequuntur minima quis molestiae repellat minus rerum in, nobis magni ex est ipsum? Dolor nesciunt, hic officia quasi dignissimos ea eveniet, obcaecati numquam laborum odio harum temporibus cumque sapiente id aliquid sit saepe pariatur perspiciatis magnam accusantium nihil magni et, culpa animi? Dolore, doloremque? Minima perspiciatis minus nobis eligendi, aliquid doloremque animi neque laborum incidunt deserunt aperiam sint, numquam ut optio quae non ullam explicabo sequi quaerat. Tempora quae, voluptatum esse, cumque debitis obcaecati ipsam dolorem fuga vel doloribus, temporibus non animi magni aliquam repudiandae maxime. Adipisci nam unde at dolor, error pariatur eveniet deleniti hic corporis reiciendis, odit sed officiis et inventore porro nesciunt possimus ratione qui, velit culpa iure reprehenderit. In dolor saepe necessitatibus tempore illo, praesentium aliquam corporis delectus reiciendis dolores, aut modi iusto. Quam quas aliquid inventore assumenda doloribus velit sequi laboriosam excepturi, voluptatum laborum perferendis eum obcaecati eos quidem voluptatibus iusto, saepe magnam enim molestiae? Hic, molestiae rem!
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
