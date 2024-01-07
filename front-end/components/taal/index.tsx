import React from "react";
import { useRouter } from "next/router";

const Taal: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div className="language-switcher">
      <label htmlFor="language" className="text-white">
        Language
      </label>
      <select id="language" onChange={handleLanguageChange} value={locale}>
        <option value="nl" className="text-black">
          Nederlands
        </option>
        <option value="en" className="text-black">
          English
        </option>
      </select>
    </div>
  );
};

export default Taal;
