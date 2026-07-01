"use client";

import { useState } from "react";
import Input from "../ui/Input";

function Search() {
  const [search, setSearch] = useState<string>("");

  return (
    <Input
      placeholder="Search Codeliver"
      value={search}
      setValue={setSearch}
      styles="w-100"
      clear
    />
  );
}

export default Search;
