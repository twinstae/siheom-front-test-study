import type { SimpleTransaction } from "../../week2/transaction/type";
import { Button } from "../../components/base/buttons/button";

export function NewTransactionForm({
  initTransaction,
}: {
  initTransaction: Partial<SimpleTransaction>;
}) {
  return (
    <form>
      {/* 거래 일자 DatePicker */}

      {/* 거래 설명 TextField */}

      {/* 분개 postings */}
      {/* 계정과목 Select With Combobox */}
      {/* 금액 amount NumberInput */}
      {/* 통화 commodity Select */}
      {/* 삭제하기 Button */}
      {/* 새 계정과목 추가하기 Button */}

      {/* 태그 tags Select with combobox tags*/}

      <Button>거래 추가하기</Button>
    </form>
  );
}
