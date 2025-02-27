async function onSubmit(values: FormValues) {
  const { idFile, poaFile, bankStatementFile, ...cleanValues } = values;

  setLoading(true);
  toast("Your form is currently being uploaded...");

  if (idFile != null && poaFile != null && bankStatementFile != null) {
    try {
      const idResponse = await uploadUrlMutation.mutateAsync({
        fileName: idFile.name!,
      });

      await fetch(idResponse.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": idFile.type,
        },
        body: idFile,
      });

      const poaResponse = await uploadUrlMutation.mutateAsync({
        fileName: poaFile?.name!,
      });

      await fetch(poaResponse.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": poaFile.type,
        },
        body: poaFile,
      });

      const bankStatementResponse = await uploadUrlMutation.mutateAsync({
        fileName: bankStatementFile?.name!,
      });

      await fetch(bankStatementResponse.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": bankStatementFile.type,
        },
        body: bankStatementFile,
      });

      const response = await formMutation.mutateAsync({
        ...cleanValues, // ✅ Excludes File objects
        idFileKey: idResponse.key,
        poaFileKey: poaResponse.key,
        bankStatementFileKey: bankStatementResponse.key,
      });

      toast.success("Form Response Successfully!");
      setLoading(false);
      router.push("/thank-you");
    } catch (err) {
      toast.error("There was an error uploading your form response");
      setLoading(false);
    }
  } else {
    toast.error("Please make sure all files are uploaded before submitting");
    setLoading(false);
  }
}
