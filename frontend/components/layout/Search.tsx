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
      styles="flex-1"
      clear
    />
  );
}

export default Search;
